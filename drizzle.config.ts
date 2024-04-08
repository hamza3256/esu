import { Config } from "drizzle-kit";
import { env } from "@/env.js";
import { dbPrefix } from "@/lib/constants";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: [`${dbPrefix}_*`],
} satisfies Config;
