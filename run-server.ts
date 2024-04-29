import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = Fastify({ logger: true });

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL("./dist/client", import.meta.url)),
  })
  .register(fastifyMiddie);
app.use(ssrHandler);

app.listen({
  host: process.env.HOST || "127.0.0.1",
  port: parseInt(process.env.PORT || "3000"),
});
