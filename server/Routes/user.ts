import { Context } from 'koa';
import Router from 'koa-router';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
// import fs from 'fs';
import connection from '../database';

const router = new Router({ prefix: '/api' });
dotenv.config();

router.get('/users', async (ctx: Context) => {
  const sql = 'select id, username, name, password, phone, address, avatar, email from users';
  const itemData = await (await connection).query(sql);
  if (itemData) {
    ctx.status = 200;
    ctx.body = itemData;
  }
});

router.get('/user/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `select id, username, name, password, phone, address, avatar, email from users where id = ${id}`;
  const itemData = await (await connection).query(sql);
  console.log(itemData[0]);
  if (itemData) {
    const data = itemData[0];
    ctx.status = 200;
    ctx.body = data;
  }
});

router.post('/upload', async (ctx: Context) => {
  const { files } = ctx.request as any;
  const dirSaveFile = path.join(__dirname, '/../../server/public');
  execSync(`move ${files.file.path} ${dirSaveFile}/${files.file.name}`);
  ctx.body = files.file.name;
});

router.post('/login-admin', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  console.log(data);
  const { username, password } = data;
  if (username === 'admin' && password === '1') {
    ctx.status = 200;
    ctx.body = 'done';
  }
});

router.post('/upload-images', async (ctx: Context) => {
  const { files } = ctx.request as any;
  const dataFile = Object.keys(files).map((key) => [key, files[key].path]) as any;
  const fileArray = [];
  const dirSaveFile = path.join(__dirname, '/../../server/public');
  await dataFile.map((file) => {
    console.log(file);
    execSync(`move ${file[1]} ${dirSaveFile}/${file[0]}`);
    fileArray.push(file[0]);
  });
  ctx.body = fileArray;
});

router.post('/login', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  const { username, password } = data;
  const sql = `select id, username, name, password, phone, address, avatar, email from users where username = "${username}" and password = "${password}"`;
  const itemData = await (await connection).query(sql);
  if (itemData[0]) {
    console.log(itemData[0]);
    ctx.status = 200;
    ctx.body = itemData[0];
  } else ctx.status = 404;
});

router.put('/edit-user', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  console.log(data);
  const {
    name, email, address, password, id,
  } = data;
  const sql = `UPDATE users SET name = "${name}", email="${email}", address="${address}", password = "${password}" WHERE id=${id}`;
  const itemData = await (await connection).query(sql);
  if (itemData.serverStatus === 2) {
    ctx.status = 200;
  } else ctx.status = 404;
});

router.delete('/user/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `DELETE users WHERE id=${id}`;
  const itemData = await (await connection).query(sql);
  if (itemData.serverStatus === 2) {
    ctx.status = 200;
  } else ctx.status = 404;
});

router.post('/add-user', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  const {
    name, username, password, phone, email, address, avatar, id,
  } = data;
  if (id) {
    const sql = `UPDATE users SET name = '${name}', username='${username}', password='${password}',
    phone='${phone}', email='${email}', address='${address}', avatar='${avatar}' WHERE id = ${id}`;
    const res = await (await connection).query(sql);
    if (res) {
      ctx.status = 200;
      ctx.body = res;
    } else ctx.statusText = 'error';
  } else {
    const sqlFillLoop = `select * from users where username = "${username}" and phone = "${phone}" and email = "${email}"`;
    const itemDataFillLoop = await (await connection).query(sqlFillLoop);
    if (itemDataFillLoop[0]) {
      ctx.statusText = 'account already in use';
    } else {
      const sqlRegister = `INSERT INTO users (name, username, password, phone, email, address, avatar)
      VALUES ('${name}', '${username}', '${password}', '${phone}', '${email}', '${address}', '${avatar}')`;
      const res = await (await connection).query(sqlRegister);
      if (res) {
        ctx.status = 200;
        ctx.statusText = 'done';
      } else ctx.statusText = 'error';
    }
  }
});

router.post('/register', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  const {
    name, username, password, phone, email,
  } = data;
  const sqlFillLoop = `select * from users where username = "${username}" and phone = "${phone}" and email = "${email}"`;
  const itemDataFillLoop = await (await connection).query(sqlFillLoop);
  if (itemDataFillLoop[0]) {
    ctx.statusText = 'account already in use';
  } else {
    const sqlRegister = `INSERT INTO users (name, username, password, phone, email)
    VALUES ('${name}', '${username}', '${password}', '${phone}', '${email}')`;
    const res = await (await connection).query(sqlRegister);
    if (res) {
      console.log(res);
      ctx.statusText = 'done';
    } else ctx.statusText = 'error';
  }
  // const sql = `select * from users where username = "${username}" and password = "${password}"`;
  // const itemData = await (await connection).query(sql);
  // if (itemData[0]) {
  //   ctx.status = 200;
  // } else ctx.status = 400;
});

export default router;
