import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
const postgres = require("postgres");
import { drizzle } from "drizzle-orm/postgres-js";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);
  console.log("STARTING MIGRATION");
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("FINISHED MIGRATION");
  process.exit(0);
}

main();
