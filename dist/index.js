"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const next_1 = __importDefault(require("next"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_formidable_1 = __importDefault(require("koa2-formidable"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const koa_static_1 = __importDefault(require("koa-static"));
const user_1 = __importDefault(require("./Routes/user"));
const products_1 = __importDefault(require("./Routes/products"));
// import { connect } from './database';
dotenv_1.default.config();
const staticDirPath = path_1.default.join(__dirname, 'public');
const port = 3000;
const server = new koa_1.default();
const router = new koa_router_1.default();
// const dev = true;
const nextApp = next_1.default({});
const handler = nextApp.getRequestHandler();
/** middleware */
server.use(koa2_formidable_1.default());
server.use(koa_bodyparser_1.default());
server.use(koa_static_1.default(staticDirPath));
(async () => {
    try {
        await nextApp.prepare();
        server
            .use(user_1.default.routes())
            .use(products_1.default.routes())
            .use(user_1.default.allowedMethods());
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
    }
    catch (e) {
        console.error(e);
    }
})();
