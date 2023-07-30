import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserFactory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  private_key: string;
}
