import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { RPCHandler } from '@orpc/server/fetch';
import { os } from '@orpc/server';
import { cors } from 'hono/cors';
import z from 'zod';

const app = new Hono();
app.use(cors());

const ping = os.handler(async () => 'ping');
const pong = os.handler(async () => 'pong');
const ball = os
  .input(z.object({ name: z.string() }))
  .output(z.object({ id: z.number() }))
  .handler(async ({ input, context }) => {
    // Define execution logic
    return { id: 1 };
  });

export const router = {
  ping,
  pong,
  ball,
  nested: { ping, pong },
};

const handler = new RPCHandler(router);
app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {}, // Provide initial context if needed
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  return await next();
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
