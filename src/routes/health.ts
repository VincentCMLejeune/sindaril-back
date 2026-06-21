import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/health',
    {
      schema: {
        response: {
          200: z.object({
            status: z.literal('ok'),
          }),
        },
      },
    },
    async () => ({ status: 'ok' as const }),
  );

  fastify.get(
    '/health/db',
    {
      schema: {
        response: {
          200: z.object({
            status: z.literal('ok'),
            db: z.literal(true),
          }),
          503: z.object({
            status: z.literal('error'),
            db: z.literal(false),
            message: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      try {
        await fastify.prisma.$queryRaw`SELECT 1`;
        return { status: 'ok' as const, db: true as const };
      } catch (error) {
        fastify.log.error(error, 'Database health check failed');
        return reply.status(503).send({
          status: 'error' as const,
          db: false as const,
          message: 'Database connection failed',
        });
      }
    },
  );
};

export default healthRoutes;
