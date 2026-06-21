import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import type { Env } from './config/env.js';
import corsPlugin from './plugins/cors.js';
import prismaPlugin from './plugins/prisma.js';
import routes from './routes/index.js';

export async function buildApp(env: Env) {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(corsPlugin, { env });
  await app.register(prismaPlugin, { env });
  await app.register(routes);

  return app;
}
