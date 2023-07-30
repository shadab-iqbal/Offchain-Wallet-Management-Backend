import axios from "axios";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Logger } from "@nestjs/common";

import { TransactionsService } from "../transactions/transactions.service";
import { reserveManagementContract } from "@/ABIs/ReserveManagement";
import { stablecoinContract } from "@/ABIs/Stablecoin";

@Processor("trade")
export class TradeConsumer {
  constructor(private transactionsService: TransactionsService) {}

  private readonly logger = new Logger(TradeConsumer.name);

  // this is kept as a default address (hardhat local node account 10)
  userAddress = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";

  /**
   * Processes a job for buying tokens.
   *
   * @param {Job} job - The job data containing the trade details.
   * @returns {Promise<any>} - The result of the token buying process.
   */
  @Process("buyTokens")
  async buyTokens(job: Job) {
    const data = job.data.dto.amount;
    const userId = job.data.dto.id;
    this.userAddress = job.data.dto.wallet_address;

    if (data < "1") return "Minimum 1 USD please!";
    try {
      const transactionFeeInUSD = await this.getTransactionCost("mint");
      const amountDeducingTrnxCost = (+data - +transactionFeeInUSD).toFixed(6);
      const tokenPriceInUsd = (await this.getCoingeckoPrice(["uniswap"])).uniswap.usd;
      const uniswapAmount = await this.usdToUniswap(amountDeducingTrnxCost, tokenPriceInUsd);
      // ==================================================================
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
      const signer = provider.getSigner();
      const reserveManagement = new ethers.Contract(
        reserveManagementContract.address,
        reserveManagementContract.abi,
        signer
      );
      const txResponse = await reserveManagement.mintStableCoin(
        stablecoinContract.address,
        this.userAddress,
        uniswapAmount
      );
      const trnxReceipt = await txResponse.wait(1);
      const trnxId = trnxReceipt.transactionHash;
      // const trimmedTrnxId = trnxId.substring(0, 5) + "..." + trnxId.substring(trnxId.length - 3);
      this.writeTrnxToDb(
        trnxId,
        userId,
        `\$${new BigNumber(data).toFixed(2)}`, // appending dollar sign to sent amount
        `${new BigNumber(uniswapAmount).div(1e18).toFixed(2)} Tokens` // converting wei to eth unit
      );

      // ==================================================================
      // const stablecoin = new ethers.Contract(stablecoinContract.address, this.stablecoinABI, signer);

      // const balance = await stablecoin.retrieveBalanceOf(reserveManagementContract.address);
      // return `${(balance / 1e18).toString()} Tokens`;

      const nativeTokenBalance = await reserveManagement.nativeTokenBalances(this.userAddress);
      return `${(nativeTokenBalance / 1e18).toString()} Tokens`;
      // ==================================================================
    } catch (e) {
      console.log("e printing... ", e);
      throw e;
    }
  }

  /**
   * Processes a job for selling tokens.
   *
   * @param {Job} job - The job data containing the trade details.
   * @returns {Promise<any>} - The result of the token selling process.
   */
  @Process("sellTokens")
  async sellTokens(job: Job) {
    const data = +job.data.dto.amount;
    const userId = job.data.dto.id;
    this.userAddress = job.data.dto.wallet_address;

    if (data <= 0) return "Token amount should be atleast greater than 0!";
    try {
      const tokenPriceInUsd = (await this.getCoingeckoPrice(["uniswap"])).uniswap.usd;
      const usdAmount = await this.uniswapToUsd(data, tokenPriceInUsd);
      const transactionFeeInUSD = await this.getTransactionCost("burn");
      const amountDeducingTrnxCost = (+usdAmount - +transactionFeeInUSD).toFixed(2);
      // console.log(typeof new BigNumber(data).times(1e18).toString());
      const dataInWei = new BigNumber(data).times(1e18).toString();

      // ==================================================================
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
      const signer = provider.getSigner();
      const reserveManagement = new ethers.Contract(
        reserveManagementContract.address,
        reserveManagementContract.abi,
        signer
      );
      const txResponse = await reserveManagement.burnStableCoin(
        stablecoinContract.address,
        this.userAddress,
        dataInWei
      );
      const trnxReceipt = await txResponse.wait(1);
      const trnxId = trnxReceipt.transactionHash;

      this.writeTrnxToDb(
        trnxId,
        userId,
        `${new BigNumber(data).toFixed(2)} Tokens`, // converting token amount to 2 decimal places
        `\$${amountDeducingTrnxCost}` // appending dollar sign to received amount
      );
      // ==================================================================
      // const stablecoin = new ethers.Contract(stablecoinContract.address, this.stablecoinABI, signer);

      // const balance = await stablecoin.retrieveBalanceOf(reserveManagementContract.address);
      // return `${(balance / 1e18).toString()} Tokens`;
      // console.log(txReceipt);

      const nativeTokenBalance = await reserveManagement.nativeTokenBalances(this.userAddress);
      return {
        tokenBalance: `${(nativeTokenBalance / 1e18).toString()} Tokens`,
        receivedUsd: amountDeducingTrnxCost,
      };
      // ==================================================================
    } catch (e) {
      console.log("e printing... ", e);
      throw e;
    }
  }

  /**
   * Processes a job for withdrawing tokens.
   *
   * @param {Job} job - The job data containing the trade details.
   * @returns {Promise<any>} - The result of the token withdrawing process.
   */
  @Process("withdrawTokens")
  async withdrawTokens(job: Job) {
    const amount = +job.data.dto.amount;
    const recipientAddress = job.data.dto.address;
    const userId = job.data.dto.id;
    this.userAddress = job.data.dto.wallet_address;
    // return recipientAddress;

    if (amount < 1) return "Minimum 1 Token please!";

    try {
      const amountInWei = new BigNumber(amount).times(1e18);
      const transactionFeeInWei = new BigNumber(await this.getTransactionCost("withdraw"));
      // return transactionFeeInWei;
      const amountDeducingTrnxCost = amountInWei.minus(transactionFeeInWei).toString();

      // ==================================================================
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
      const signer = provider.getSigner();

      const stablecoin = new ethers.Contract(
        stablecoinContract.address,
        stablecoinContract.abi,
        signer
      );

      const reserveManagement = new ethers.Contract(
        reserveManagementContract.address,
        reserveManagementContract.abi,
        signer
      );

      // ==================================================================
      // const nativeTokenBalance: ethers.BigNumber = await stablecoin.balanceOf(
      //   // this.userAddress
      //   recipientAddress
      // );
      const nativeTokenBalance: ethers.BigNumber = await reserveManagement.nativeTokenBalances(
        this.userAddress
        // recipientAddress
      );

      if (nativeTokenBalance.lte(amountInWei.toString())) {
        console.log("Error detected!!");
        throw new Error("Insufficient Fund!");
      }

      let txResponse;

      txResponse = await stablecoin.transferTo(recipientAddress, amountDeducingTrnxCost);
      const trnxReceipt = await txResponse.wait(1);

      const trnxId = trnxReceipt.transactionHash;
      this.writeTrnxToDb(trnxId, userId, `${new BigNumber(amount).toFixed(2)} Tokens`, "0 Tokens");

      // we also need to burn the tokens from the reserveContract
      txResponse = await reserveManagement.burnStableCoin(
        stablecoinContract.address,
        this.userAddress,
        amountInWei.toString()
      );
      await txResponse.wait(1);

      // ==================================================================

      // return (await stablecoin.balanceOf(this.userAddress)).toString();

      const senderBalance = await reserveManagement.nativeTokenBalances(this.userAddress);
      const receiverBalance = await stablecoin.balanceOf(recipientAddress);
      return {
        senderBalance: `${(senderBalance / 1e18).toString()} Tokens`,
        receiverBalance: `${(receiverBalance / 1e18).toString()} Tokens`,
      };
      // ==================================================================
    } catch (e) {
      console.log("e printing... ", e);
      throw e;
    }
  }

  /**
   * Fetches the current price of cryptocurrencies from Coingecko API.
   *
   * @param {string[]} symbols - The symbols of the cryptocurrencies to retrieve the price for.
   * @returns {Promise<object>} - The price data for the specified cryptocurrencies.
   */
  async getCoingeckoPrice<T extends string>(symbols: T[]) {
    return await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(",")}&vs_currencies=usd`
      )
      .then((res) => res.data);
  }

  /**
   * Converts an amount in USD to the equivalent value in Uniswap token units.
   *
   * @param {string} amount - The amount in USD to convert.
   * @param {number} priceInUsd - The price of the token in USD.
   * @returns {string} - The equivalent value in Uniswap token units.
   */
  async usdToUniswap(amount: string, priceInUsd: number) {
    const sentUsd = new BigNumber(amount);
    const tokenPriceInUsd = new BigNumber(priceInUsd);
    // uniswapAmount = (amount / priceInUsd) with precision upto 18 decimal places * 10^18
    const uniswapAmount = new BigNumber(sentUsd.div(tokenPriceInUsd).toFixed(18))
      .times("1e18")
      .toString();
    return uniswapAmount;
  }

  /**
   * Converts an amount in Uniswap token units to the equivalent value in USD.
   *
   * @param {number} amount - The amount in Uniswap token units to convert.
   * @param {number} priceInUsd - The price of the token in USD.
   * @returns {string} - The equivalent value in USD.
   */
  async uniswapToUsd(amount: number, priceInUsd: number) {
    const sentTokens = new BigNumber(amount);
    const tokenPriceInUsd = new BigNumber(priceInUsd);
    // usdAmount = (tokenAmount * priceInUsd) with precision upto 2 decimal places
    const usdAmount = new BigNumber(sentTokens.multipliedBy(tokenPriceInUsd).toFixed(2)).toString();
    return usdAmount;
  }

  /**
   * Get the estimated transaction cost for a specific task.
   *
   * @param {string} task - The task for which to estimate the transaction cost.
   * @returns {Promise<string>} - The estimated transaction cost in USD.
   */
  async getTransactionCost(task: string) {
    // return 0;

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = provider.getSigner();
    // gasPrice will be in wei unit and the type will be "ethers.BigNumber"
    const gasPrice = await provider.getGasPrice();

    // const gasLimit = await stablecoin.estimateGas.mint("500");
    const stablecoin = new ethers.Contract(
      stablecoinContract.address,
      stablecoinContract.abi,
      signer
    );

    const reserveContract = new ethers.Contract(
      reserveManagementContract.address,
      reserveManagementContract.abi,
      signer
    );

    let gasLimit;

    if (task === "mint") {
      gasLimit = await reserveContract.estimateGas.mintStableCoin(
        stablecoinContract.address,
        this.userAddress,
        "500"
      );
    } else if (task === "burn") {
      gasLimit = await reserveContract.estimateGas.burnStableCoin(
        stablecoinContract.address,
        this.userAddress,
        "500"
      );
    } else if (task === "withdraw") {
      const transferGasLimit = await stablecoin.estimateGas.transferTo(
        this.userAddress,
        "500"
        // reserveManagementContract.address,
        // "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
        // "9999999999999896000"
      );
      // return transferGasLimit.toString();
      // after withdrawing, we also need to burn the tokens. thus the below estimation
      const burnGasLimit = await reserveContract.estimateGas.burnStableCoin(
        stablecoinContract.address,
        this.userAddress,
        "500"
      );
      return transferGasLimit.add(burnGasLimit).toString(); // returning here because we want the cost in wei unit, not in usd
    }
    // const transactionFee = ethers.utils.formatUnits(gasPrice.mul(gasLimit), "ether");
    const ethPriceInUSD = (await this.getCoingeckoPrice(["ethereum"])).ethereum.usd;
    const transactionFeeInWei = gasPrice.mul(gasLimit);
    const transactionFeeInEth = ethers.utils.formatUnits(transactionFeeInWei, "ether");
    const transactionFeeInUSD = parseFloat(transactionFeeInEth) * ethPriceInUSD;

    return transactionFeeInUSD.toFixed(6);
  }

  /**
   * Write a transaction to the database.
   *
   * @param {string} trnxId - The transaction ID.
   * @param {number} userId - The ID of the user associated with the transaction.
   * @param {string} userSent - The amount sent by the user.
   * @param {string} userReceived - The amount received by the user.
   * @returns {void}
   */
  async writeTrnxToDb(trnxId: string, userId: number, userSent: string, userReceived: string) {
    this.transactionsService.writeUserTransactions(trnxId, userId, userSent, userReceived);
  }
}
