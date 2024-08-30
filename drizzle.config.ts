import { type Config } from "drizzle-kit"

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL_LOCAL!,
  },
} satisfies Config