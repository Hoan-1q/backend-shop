import { Context } from 'koa';
import Router from 'koa-router';
// import path from 'path';
// import { execSync } from 'child_process';
import dotenv from 'dotenv';
// import fs from 'fs';
import { connection } from '../database';

const router = new Router({ prefix: '/api' });
dotenv.config();

router.get('/users', async (ctx: Context) => {
  console.log(ctx);
  connection.query('select * from users', (err, res) => {
    if (err) throw err;
    const test = JSON.stringify(res);
    console.log(test);
  });
});

router.post('/login', async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;
  const sql = `select * from users where username = "${username}" and password = "${password}"`;
  connection.query(sql, (err, results, fields) => {
    if (err) throw err;
    // const user = JSON.stringify(res);
    console.log(err, results, fields);
  });
  // connection.query('select * from users', (err, res, fields) => {
  //   if(err) throw err;
  //   const test = JSON.stringify(res);
  //   console.log(test);
  // })
});

export default router;
