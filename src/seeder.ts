import { seeder } from "nestjs-seeder";

import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOptions } from "../src/config";

import { UserFactory } from "../src/database/factories/user.factory";
import { UserSeeder } from "../src/database/seeders/user.seeder";

seeder({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [__dirname + "/database/factories/*.factory.{ts,js}"],
    }),
    TypeOrmModule.forFeature([UserFactory]),
  ],
}).run([UserSeeder]);
