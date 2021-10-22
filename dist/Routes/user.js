"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
// import path from 'path';
// import { execSync } from 'child_process';
const dotenv_1 = __importDefault(require("dotenv"));
// import fs from 'fs';
const database_1 = __importDefault(require("../database"));
const router = new koa_router_1.default({ prefix: '/api' });
dotenv_1.default.config();
router.get('/users', async (ctx) => {
    console.log(ctx);
    (await database_1.default).query('select * from users', (err, res) => {
        if (err)
            throw err;
        const test = JSON.stringify(res);
        console.log(test);
    });
});
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;
    const sql = `select * from users where username = "${username}" and password = "${password}"`;
    const itemData = await (await database_1.default).query(sql);
    if (itemData[0]) {
        console.log(itemData[0]);
        ctx.status = 200;
        ctx.body = itemData;
    }
    else
        ctx.status = 404;
});
router.put('/edit-user', async (ctx) => {
    const { name, email, address, password, id, } = ctx.request.body;
    console.log(name, email, address, password, id);
    const sql = `UPDATE users SET name = "${name}", email="${email}", address="${address}", password = "${password}" WHERE id=${id}`;
    const itemData = await (await database_1.default).query(sql);
    if (itemData.serverStatus === 2) {
        ctx.status = 200;
    }
    else
        ctx.status = 404;
});
router.post('/register', async (ctx) => {
    const { name, username, password, phone, email, } = ctx.request.body;
    const sqlFillLoop = `select * from users where username = "${username}" and phone = "${phone}" and email = "${email}"`;
    const itemDataFillLoop = await (await database_1.default).query(sqlFillLoop);
    if (itemDataFillLoop[0]) {
        ctx.statusText = 'account already in use';
    }
    else {
        const sqlRegister = `INSERT INTO users (name, username, password, phone, email)
    VALUES ('${name}', '${username}', '${password}', '${phone}', '${email}')`;
        const res = await (await database_1.default).query(sqlRegister);
        if (res) {
            console.log(res);
            ctx.statusText = 'done';
        }
        else
            ctx.statusText = 'error';
    }
    // const sql = `select * from users where username = "${username}" and password = "${password}"`;
    // const itemData = await (await connection).query(sql);
    // if (itemData[0]) {
    //   ctx.status = 200;
    // } else ctx.status = 400;
});
exports.default = router;
