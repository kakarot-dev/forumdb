import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function ping(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/v1/ping",
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
      return { message: "Pong!" };
    },
  });
});
