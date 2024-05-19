import Fastify from "fastify";
import logger from "./util/logger.ts";
import { Partials, IntentsBitField } from "discord.js";
import { ForumClient } from "./bot/client/forumdb";
import setupPlugin from "./api/plugins/setup.ts";
import { PrismaClient } from "@prisma/client";

logger.info("🔥 Loading Api 🔥");
const app = Fastify({ logger });
await app.register(setupPlugin);
app.log.info("🚀 Loaded Astro 🚀");

export const prisma = new PrismaClient();
logger.info("🔗 Connected to database 🔗 ");
logger.info("🤖 Loading Bot 🤖");
const client = new ForumClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
    Partials.Reaction,
  ],
  allowedMentions: {
    repliedUser: true,
  },
});
const start = async () => {
  prisma.$connect();
  app.listen({
    host: Bun.env.HOST || "127.0.0.1",
    port: parseInt(Bun.env.PORT || "3000"),
  });
  client.connect(Bun.env.DISCORD_BOT_TOKEN!);
};
start();
