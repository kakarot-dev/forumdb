import fastifyPlugin from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { handler as ssrHandler } from "../../dist/server/entry.mjs";
import { fileURLToPath } from "bun";

export default fastifyPlugin(async function setupPlugin(app) {
  await app.register(fastifyMiddie);

  await app.register(fastifyCors, {
    origin: "*",
  });

  app.addHook("preHandler", (_req, res, done) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.header(
      "X-Powered-By",
      "AssistifyAi Development <https://assistifyai.org>",
    );
    res.header("User-Agent", `ForumDB v1`);

    done();
  });
  await app.register(fastifyStatic, {
    root: fileURLToPath(new URL("../../dist/client/", import.meta.url)),
  });

  await app.register(import("../routes/index.ts"));
  app.use(ssrHandler);
});
