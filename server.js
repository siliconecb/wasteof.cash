import { handler } from "./build/handler.js";
import Koa from "koa";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(async (ctx, next) => {
  ctx.set('X-Powered-By', 'late nights and coffee');
  ctx.set('X-Made-With', '<3 from siliconecb_');

  await handler(ctx.req, ctx.res);
  ctx.respond = false;
});

app.listen(port, host, () => {
  console.log('wasteof.cash PRODUCTION');
  console.log('');
  console.log('hey there! :)');
  console.log(`listening on ${host}:${port}`);
});