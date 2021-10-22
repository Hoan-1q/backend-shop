"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const connection = promise_mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop',
});
exports.default = connection;
// export const connect = () => {
//   connection.connect((err) => {
//     if (!err) console.log('Database is connected!!');
//     else console.log('Database connect error');
//   });
// };
// export const closeDB = () => {
//   connection.end((err) => {
//     if (!err) console.log('close database');
//   });
// };
