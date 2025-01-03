import { handler } from "./build/handler.js";
import Koa from "koa";
import dotenv from "dotenv";
import { RateLimit } from "koa2-ratelimit";

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";


// response handling (for rate limits)
const errmsg = (ctx) => {
  const now = Date.now();
  const reset = ctx.state.rateLimit.reset * 1000;
  const eta = Math.max(0, Math.ceil((reset - now) / 60000));

  ctx.body = {
    error: `bozo slow down, rate limited for: ${eta} minute${eta !== 1 ? 's' : ''}`
  };
  ctx.status = 429;
};

// rate limiter config
const staticlimit = RateLimit.middleware({
  interval: { min: 15 },
  max: 99,
  prefixKey: "static",
  message: errmsg,
  handler: errmsg
});

const apilimit = RateLimit.middleware({
  interval: { min: 15 },
  max: 100,
  prefixKey: "api",
  message: errmsg,
  handler: errmsg
});

// rate limiter
app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/static')) {
    await staticlimit(ctx, next);
  } else if (ctx.path.startsWith('/api')) {
    await apilimit(ctx, next);
  } else {
    await next();
  }
});

// caching for images
app.use(async (ctx, next) => {
  if (ctx.path.endsWith('.jpg') || ctx.path.endsWith('.png') || ctx.path.endsWith('.gif') || ctx.path.endsWith('.jpeg') || ctx.path.endsWith('.bmp') || ctx.path.endsWith('.ico') || ctx.path.endsWith('.svg')) {
    ctx.set('Cache-Control', 'public, max-age=31536000'); // cache for 1 year
    ctx.set('Expires', new Date(Date.now() + 31536000000).toUTCString()); // cache for 1 year
  }

  await next();
});

app.use(async (ctx) => {
  ctx.set('Via', 'varnish (Varnish/7.6.0)');
  ctx.set('X-Powered-By', 'late nights and coffee');
  ctx.set('X-Made-With', '<3 from siliconecb_');
  ctx.set('Alt-Svc', 'h3');
  ctx.set('Strict-Transport-Security', 'max-age=604800;');

  await handler(ctx.req, ctx.res);
  ctx.respond = false;
});

app.listen(port, host, () => {
  console.log('wasteof.cash PRODUCTION');
  console.log('');
  console.log('hey there! :)');
  console.log(`listening on ${host}:${port}`);
});