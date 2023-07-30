/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface ReserveManagementInterface extends utils.Interface {
  functions: {
    "burnStableCoin(address,address,uint256)": FunctionFragment;
    "erc1155Receive(address,uint256,address,uint256)": FunctionFragment;
    "erc1155TokenBalances(address,uint256,address)": FunctionFragment;
    "erc1155Transfer(address,address,uint256,uint256,bytes)": FunctionFragment;
    "erc20Receive(address,address,uint256)": FunctionFragment;
    "erc20TokenBalances(address,address)": FunctionFragment;
    "erc20Transfer(address,address,uint256)": FunctionFragment;
    "erc721Receive(address,uint256,address)": FunctionFragment;
    "erc721TokenBalances(address,uint256)": FunctionFragment;
    "erc721Transfer(address,address,uint256)": FunctionFragment;
    "mintStableCoin(address,address,uint256)": FunctionFragment;
    "nativeTokenBalances(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "burnStableCoin"
      | "erc1155Receive"
      | "erc1155TokenBalances"
      | "erc1155Transfer"
      | "erc20Receive"
      | "erc20TokenBalances"
      | "erc20Transfer"
      | "erc721Receive"
      | "erc721TokenBalances"
      | "erc721Transfer"
      | "mintStableCoin"
      | "nativeTokenBalances"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "burnStableCoin",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc1155Receive",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc1155TokenBalances",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc1155Transfer",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20Receive",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20TokenBalances",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20Transfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721Receive",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TokenBalances",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721Transfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintStableCoin",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nativeTokenBalances",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "burnStableCoin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc1155Receive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc1155TokenBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc1155Transfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20Receive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20TokenBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20Transfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721Receive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TokenBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721Transfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintStableCoin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nativeTokenBalances",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ReserveManagement extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ReserveManagementInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    burnStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc1155Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc1155TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    erc1155Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc20Receive(
      tokenAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc20TokenBalances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    erc20Transfer(
      tokenAddress: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc721Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    erc721TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    erc721Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    mintStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    nativeTokenBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  burnStableCoin(
    stableCoinAddress: string,
    userAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc1155Receive(
    tokenAddress: string,
    tokenId: BigNumberish,
    userAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc1155TokenBalances(
    arg0: string,
    arg1: BigNumberish,
    arg2: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  erc1155Transfer(
    tokenAddress: string,
    to: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc20Receive(
    tokenAddress: string,
    userAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc20TokenBalances(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  erc20Transfer(
    tokenAddress: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc721Receive(
    tokenAddress: string,
    tokenId: BigNumberish,
    userAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  erc721TokenBalances(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  erc721Transfer(
    tokenAddress: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  mintStableCoin(
    stableCoinAddress: string,
    userAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  nativeTokenBalances(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    burnStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc1155Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc1155TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc1155Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    erc20Receive(
      tokenAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc20TokenBalances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc20Transfer(
      tokenAddress: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    erc721Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    nativeTokenBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    burnStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc1155Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc1155TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc1155Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc20Receive(
      tokenAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc20TokenBalances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc20Transfer(
      tokenAddress: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc721Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    erc721TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc721Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    mintStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    nativeTokenBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    burnStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc1155Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc1155TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc1155Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc20Receive(
      tokenAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc20TokenBalances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc20Transfer(
      tokenAddress: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc721Receive(
      tokenAddress: string,
      tokenId: BigNumberish,
      userAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    erc721TokenBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc721Transfer(
      tokenAddress: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    mintStableCoin(
      stableCoinAddress: string,
      userAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    nativeTokenBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}