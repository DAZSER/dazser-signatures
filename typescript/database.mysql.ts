import mysql from "mysql";
import { promisify } from "util";

const pool = mysql.createPool({
  connectionLimit: 2,
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: "global",
});

const promisePool = promisify(pool.query).bind(pool);

export default async function(query: string) {
  return promisePool(query);
}
