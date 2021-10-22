import { Context } from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import connection from '../database';
import path from 'path';
import { execSync } from 'child_process';

const routerProducts = new Router({ prefix: '/api' });
dotenv.config();

routerProducts.get('/products', async (ctx: Context) => {
  const sql = 'select id, price, title, avatar, amount, summary, content, category_id, user_id from products';
  const dataProducts = await (await connection).query(sql);
  if (dataProducts) {
    ctx.status = 200;
    ctx.body = dataProducts;
  } else ctx.status = 404;
});

routerProducts.get('/orders', async (ctx: Context) => {
  const sql = 'select * from orders';
  const dataOrders = await (await connection).query(sql);
  console.log(dataOrders);
  if (dataOrders) {
    ctx.status = 200;
    ctx.body = dataOrders;
  } else ctx.status = 404;
});

routerProducts.post('/app-upload', async (ctx: Context) => {
  const { files } = ctx.request as any;
  console.log(files);
  const dirSaveFile = path.join(__dirname, '/../../server/public');
  execSync(`move ${files.photo.path} ${dirSaveFile}/${files.photo.name}`);
  ctx.body = files.photo.name;
});

routerProducts.get('/categories', async (ctx: Context) => {
  const sql = 'select id, name from categories';
  const dataCategory = await (await connection).query(sql);
  if (dataCategory) {
    ctx.status = 200;
    ctx.body = dataCategory;
  } else ctx.status = 404;
});

routerProducts.post('/create-order', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  const { user, address, cart, total } = data;
  console.log(data);
  const dataUser = user;
  const { id, name, phone, email } = dataUser;
  const sql = `INSERT INTO orders ( user_id, name, address, mobile, email, price_total, payment_status)
  VALUES (${id}, '${name}', '${address || dataUser.address}', '${phone}', '${email}', ${total}, 0)`;
  console.log(sql);
  const dataCategory = await (await connection).query(sql);
  cart.map(async (product) => {
    const sqlDetailOrder = `INSERT INTO order_details ( order_id, product_name, product_price, quantity)
    VALUES (${dataCategory.insertId}, '${product.title}', ${product.price}, ${product.quantity})`;
    console.log(sqlDetailOrder);
    await (await connection).query(sqlDetailOrder);
  });
  if (dataCategory) {
    ctx.status = 200;
    ctx.body = dataCategory;
  } else ctx.status = 404;
});

routerProducts.get('/products/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `select id, price, title, avatar, content, amount, images from products where id = ${id}`;
  const dataProduct = await (await connection).query(sql);
  const imagesData = dataProduct[0].images.split(',');
  console.log(imagesData);
  const data = {
    id: dataProduct[0].id,
    price: dataProduct[0].price,
    title: dataProduct[0].title,
    avatar: dataProduct[0].avatar,
    content: dataProduct[0].content,
    amount: dataProduct[0].amount,
    images: imagesData,
  };
  if (dataProduct) {
    ctx.status = 200;
    ctx.body = data;
  } else ctx.status = 404;
});

routerProducts.post('/add-product', async (ctx: Context) => {
  const { data } = ctx.request.body as any;
  console.log(data);
  const {
    title, avatar, images, price, amount, sumary, content, id, category, userID,
  } = data;
  const dataImage = images.join();
  if (id) {
    const sql = `UPDATE products SET title = "${title}", avatar="${avatar}", price=${price}, amount = ${amount}, 
    summary="${sumary}", content="${content}", images="${dataImage}", category_id=${category}  WHERE id=${id}`;
    const itemData = await (await connection).query(sql);
    if (itemData.serverStatus === 2) {
      ctx.status = 200;
    } else ctx.status = 404;
  } else {
    const sql = `INSERT INTO products (title, avatar, images, price, amount, summary, content, category_id, user_id)
    VALUES ('${title}', '${avatar}', '${dataImage}', ${price}, ${amount}, '${sumary}', '${content}', ${category}, ${userID})`;
    console.log(sql);
    const itemData = await (await connection).query(sql);
    if (itemData.serverStatus === 2) {
      ctx.status = 200;
    } else ctx.status = 404;
  }
});

routerProducts.delete('/products/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `DELETE FROM products WHERE id=${id}`;
  console.log(sql);
  const itemData = await (await connection).query(sql);
  if (itemData.serverStatus === 2) {
    ctx.status = 200;
  } else ctx.status = 404;
});

routerProducts.delete('/products/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `DELETE FROM products WHERE id=${id}`;
  console.log(sql);
  const itemData = await (await connection).query(sql);
  if (itemData.serverStatus === 2) {
    ctx.status = 200;
  } else ctx.status = 404;
});

routerProducts.get('/orders/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const sql = `SELECT * FROM orders, order_details WHERE user_id=${id} AND orders.id = order_details.order_id;`;
  console.log(sql);
  const itemData = await (await connection).query(sql);
  console.log(itemData);
  if (itemData) {
    ctx.status = 200;
    ctx.body = itemData;
  } else ctx.status = 404;
});

export default routerProducts;
