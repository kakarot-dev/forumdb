import { ActivityType, Events, Guild } from "discord.js";
import type { ForumClient } from "../../forumdb";
import { EventTemplate } from "../../../temp/event";

export default class ReadyEvent extends EventTemplate {
  constructor() {
    super({ name: Events.GuildCreate, once: true });
  }

  public async exec(bot: ForumClient, guild: Guild): Promise<void> {
    bot.logger.info(`Joined guild: ${guild.name} (${guild.id})`);

    const main = Bun.env.GUILD_ID!;
    if (guild.id !== main) {
      guild.leave();
      return bot.logger.info(`Left guild: ${guild.name} (${guild.id})`);
    } else {
      bot.logger.info(`Joined main guild: ${guild.name} (${guild.id})`);
    }
  }
}
