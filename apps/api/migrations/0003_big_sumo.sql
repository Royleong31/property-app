CREATE TABLE IF NOT EXISTS "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"address" varchar(128)
);
