import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const route: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/health",
    {

    },
    async (request, reply) => {
      return "OK";
    }
  )
}
