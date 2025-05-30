import "https://deno.land/x/dotenv/load.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { initializeTables } from "../database/QueryManager.js"


export async function getActiveClientConnection() {
  const client = new Client({
    hostname: Deno.env.get("DB_HOST") || "localhost",
    port: Number(Deno.env.get("DB_PORT")) || 5432,
    user: Deno.env.get("DB_USER") || "user",
    password: Deno.env.get("DB_PASSWORD") || "password",
    database: Deno.env.get("DB_NAME") || "dbname",
    tls: { enforce: false }
  });
  await client.connect();
  return client;
}

// const client = new Client(process.env.DB_URL)

async function connectDB() {
  try {
    const client = await getActiveClientConnection()
    const result = await client.queryObject("SELECT NOW();");
    initializeTables()
    console.log("✅ PostgreSQL connected successfully at", result.rows[0].now);
    return client;
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err);
    throw err;
  }
}

export { connectDB };
