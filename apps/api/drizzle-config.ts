import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  }
} satisfies Config;
