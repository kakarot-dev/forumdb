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

  await app.register(fastifyStatic, {
    root: fileURLToPath(new URL("../../dist/client/", import.meta.url)),
  });
  app.use(ssrHandler);
});
