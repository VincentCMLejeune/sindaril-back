import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import type { Env } from '../config/env.js';

const corsPlugin = fp<{ env: Env }>(async (fastify, { env }) => {
  await fastify.register(cors, {
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map((o: string) => o.trim()),
  });
});

export default corsPlugin;
