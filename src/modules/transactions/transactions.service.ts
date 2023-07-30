import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactions } from "./entities/transactions.entity";
import { FindManyOptions, Repository } from "typeorm";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions) private transactionsRepository: Repository<Transactions>
  ) {}

  /**
   * Get transactions for a specific user.
   *
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Transactions[]>} - A promise that resolves to an array of transactions for the user.
   */
  async getUserTransactions(userId: number) {
    const options: FindManyOptions<Transactions> = {
      where: { user_id: userId },
    };
    return this.transactionsRepository.find(options);
  }

  /**
   * Write user transactions to the database.
   *
   * @param {string} trnxId - The transaction ID.
   * @param {number} userId - The ID of the user.
   * @param {string} userSent - The amount sent by the user.
   * @param {string} userReceived - The amount received by the user.
   * @returns {Promise<void>} - A promise that resolves when the transactions are successfully written to the database.
   */
  async writeUserTransactions(
    trnxId: string,
    userId: number,
    userSent: string,
    userReceived: string
  ) {
    const transaction: Transactions = {
      trnx_id: trnxId,
      user_id: userId,
      user_sent: userSent,
      user_received: userReceived,
    };
    await this.transactionsRepository.save(transaction);
  }
}
