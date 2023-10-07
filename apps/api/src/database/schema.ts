import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const popularityEnum = pgEnum("popularity", ["unknown", "known", "popular"]);

export const countries = pgTable(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
  },
  (countries) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(countries.name),
    };
  }
);

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: integer("country_id").references(() => countries.id),
  popularity: popularityEnum("popularity"),
});

export const people = pgTable("people", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  address: varchar("address", { length: 128 }),
});
