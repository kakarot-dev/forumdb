import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function appRoutes(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/v1",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (_req, _res) => {
      return { message: "Welcome to the API" };
    },
  });
  await app.register(import("./v1/ping.ts"));
});
