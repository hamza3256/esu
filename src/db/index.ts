import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("Database env: " + process.env.DATABASE_URL_LOCAL!)
const client = postgres(
process.env.DATABASE_URL_LOCAL!
);

export const db = drizzle(client);
