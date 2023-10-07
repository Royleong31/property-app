import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
const postgres = require("postgres");
import * as schema from "./schema";
export const DB_PROVIDER = "DB_PROVIDER";

export const databaseProvider = [
  {
    provide: DB_PROVIDER,
    useFactory: () => {
      const dbClient = postgres(process.env.DATABASE_URL, { max: 1 });
      const db = drizzle(dbClient, { schema });
      return db;
    },
  },
];
