import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import logger from "./app/util/logger.ts";
const app = Fastify({ logger });
await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL("./dist/client", import.meta.url)),
  })
  .register(fastifyMiddie);
app.use(ssrHandler);
app.log.info("🚀 Loaded Astro 🚀");
app.listen({
  host: Bun.env.HOST || "127.0.0.1",
  port: parseInt(Bun.env.PORT || "3000"),
});
