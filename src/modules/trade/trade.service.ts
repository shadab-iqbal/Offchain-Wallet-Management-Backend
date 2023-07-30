import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

import { TradeDto } from "./dto/trade.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class TradeService {
  constructor(
    @InjectQueue("trade") private readonly tradeQueue: Queue,
    private userService: UserService
  ) {}

  /**
   * Buys tokens for the specified user using the provided trade details.
   *
   * @param {TradeDto} dto - The trade details for buying tokens.
   * @param {number} id - The ID of the user making the trade.
   * @returns {Promise<any>} - The result of the token purchase process.
   */
  async buyTokens(dto: TradeDto, id: number) {
    const wallet_address = await this.userService.getWalletAddressById(id);
    const job = await this.tradeQueue.add("buyTokens", { dto: { ...dto, wallet_address, id } });

    const jobResult = await job.finished();
    return jobResult;

    // return wallet_address;

    // const job = await this.tradeQueue.add({
    //   dto: { ...dto, wallet_address },
    // });
  }

  /**
   * Sells tokens for the specified user using the provided trade details.
   *
   * @param {TradeDto} dto - The trade details for selling tokens.
   * @param {number} id - The ID of the user making the trade.
   * @returns {Promise<any>} - The result of the token selling process.
   */
  async sellTokens(dto: TradeDto, id: number) {
    const wallet_address = await this.userService.getWalletAddressById(id);
    const job = await this.tradeQueue.add("sellTokens", { dto: { ...dto, wallet_address, id } });

    const jobResult = await job.finished();
    return jobResult;
  }

  /**
   * Withdraws tokens for the specified user using the provided trade details.
   *
   * @param {TradeDto} dto - The trade details for withdrawing tokens.
   * @param {number} id - The ID of the user making the withdrawal.
   * @returns {Promise<any>} - The result of the token withdrawal process.
   */
  async withdrawTokens(dto: TradeDto, id: number) {
    // return dto;
    const wallet_address = await this.userService.getWalletAddressById(id);
    const job = await this.tradeQueue.add("withdrawTokens", {
      dto: { ...dto, wallet_address, id },
    });

    const jobResult = await job.finished();
    return jobResult;
  }
}
