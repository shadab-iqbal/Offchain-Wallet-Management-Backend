import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("transactions")
export class Transactions {
  @PrimaryColumn()
  trnx_id: string;

  @Column()
  user_id: number;

  @Column()
  user_sent: string;

  @Column()
  user_received: string;
}
