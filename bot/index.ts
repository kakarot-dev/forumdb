import { Partials, IntentsBitField } from "discord.js";
import { ForumClient } from "./client/forumdb";

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
    parse: ["users", "roles"],
    repliedUser: true,
  },
});
client.connect(Bun.env.DISCORD_BOT_TOKEN!);
