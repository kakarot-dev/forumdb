import type { FastifyInstance } from "fastify";

export default async function ping(app: FastifyInstance) {
  app.get("/ping", async (_request, _reply) => {
    return {
      message: "pong",
    };
  });
}
