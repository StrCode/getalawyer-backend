import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';

const app = new Hono();

app
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .get('/', (c) => {
    return c.text('Hello Hono!');
  });

export default app;