import { Module } from "@nestjs/common";
import { DB_PROVIDER, databaseProvider } from "./database.provider";
import { drizzle } from "drizzle-orm/postgres-js";

@Module({
  providers: [...databaseProvider],
  exports: [DB_PROVIDER],
})
export class DatabaseModule {}
export type dbType = ReturnType<typeof drizzle>;
