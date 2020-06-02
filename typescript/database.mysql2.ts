import { createPool } from "mysql2/promise";

export default createPool({
  connectionLimit: 10,
  database: "global",
  host: process.env.DB_HOST as string,
  password: process.env.DB_PASS as string,
  user: process.env.DB_USER as string,
});
