"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("util");
const pool = mysql_1.default.createPool({
    connectionLimit: 2,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "global",
});
const promisePool = util_1.promisify(pool.query).bind(pool);
async function default_1(query) {
    return promisePool(query);
}
exports.default = default_1;
