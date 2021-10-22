"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
const routerProducts = new koa_router_1.default({ prefix: '/api' });
dotenv_1.default.config();
routerProducts.get('/products', async (ctx) => {
    const sql = 'select id, price, title, avatar  from products';
    const dataProducts = await (await database_1.default).query(sql);
    if (dataProducts) {
        ctx.status = 200;
        ctx.body = dataProducts;
    }
    else
        ctx.status = 404;
});
routerProducts.get('/category', async (ctx) => {
    const sql = 'select id, name from categories';
    const dataCategory = await (await database_1.default).query(sql);
    console.log(dataCategory);
    if (dataCategory) {
        ctx.status = 200;
        ctx.body = dataCategory;
    }
    else
        ctx.status = 404;
});
routerProducts.get('/product/:id', async (ctx) => {
    const { id } = ctx.params;
    const sql = `select id, price, title, avatar, content, amount from products where id = ${id}`;
    const dataProduct = await (await database_1.default).query(sql);
    if (dataProduct) {
        ctx.status = 200;
        ctx.body = dataProduct;
    }
    else
        ctx.status = 404;
});
exports.default = routerProducts;
