import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import formidable from 'koa2-formidable';
import dotenv from 'dotenv';
import protecedRouter from './Routes/user';
import { connect } from './database';

dotenv.config();

const port = 3000;

const server = new Koa();
const router = new Router();

/** middleware */
server.use(formidable());
server.use(bodyParser());

(async () => {
  try {
    server
      .use(protecedRouter.routes())
      .use(protecedRouter.allowedMethods());

    router.get('(.*)', async (ctx) => {
      ctx.respond = false;
      ctx.res.statusCode = 200;
    });

    server.use(router.routes());

    connect();

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
