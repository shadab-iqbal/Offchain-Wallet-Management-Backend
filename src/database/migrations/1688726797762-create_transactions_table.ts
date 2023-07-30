import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1688726797762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "trnx_id",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "user_sent",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "user_received",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions", true);
  }
}
