// import { UserFactory } from "@/database/factories/user.factory";
import { UserFactory } from "../factories/user.factory";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { Seeder } from "nestjs-seeder";
import { Repository } from "typeorm";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserFactory)
    private readonly repo: Repository<UserFactory>
  ) {}

  async seed(): Promise<any> {
    const count = await this.repo.count();
    if (count !== 0) return;
    await this.repo.save(
      this.repo.create([
        {
          email: "sdb@gmail.com",
          password: await argon.hash("password"),
        },
      ])
    );
  }

  async drop(): Promise<any> {
    await this.repo.delete({});
  }
}
