import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import formidable from 'koa2-formidable';
import dotenv from 'dotenv';
import path from 'path';
import serve from 'koa-static';
import protecedRouter from './Routes/user';
import productsRouter from './Routes/products';
// import { connect } from './database';

dotenv.config();

const staticDirPath = path.join(__dirname, 'public');

const port = 3000;

const server = new Koa();
const router = new Router();

const dev = true;

const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

/** middleware */
server.use(formidable());
server.use(bodyParser());
server.use(serve(staticDirPath));

(async () => {
  try {
    await nextApp.prepare();

    server
      .use(protecedRouter.routes())
      .use(productsRouter.routes())
      .use(protecedRouter.allowedMethods());

    router.get('(.*)', async (ctx) => {
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    });

    server.use(router.routes());

    // connect();

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
