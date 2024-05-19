import Fastify from "fastify";
import logger from "./util/logger.ts";
import { Partials, IntentsBitField } from "discord.js";
import { ForumClient } from "./bot/client/forumdb";
import setupPlugin from "./api/plugins/setup.ts";
import "./prisma/conn.ts";

logger.info("🔥 Loading Api 🔥");
const app = Fastify({ logger });
app.register(setupPlugin);
app.log.info("🚀 Loaded Astro 🚀");

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
  client.db.connect();
  app.listen({
    host: Bun.env.HOST || "127.0.0.1",
    port: parseInt(Bun.env.PORT || "3000"),
  });
  client.connect(Bun.env.DISCORD_BOT_TOKEN!);
};
start();
