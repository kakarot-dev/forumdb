import { ActivityType, Events, Guild as DjsGuild } from "discord.js";
import type { ForumClient } from "../../forumdb";
import { EventTemplate } from "../../../temp/event";
import Guild from "../../../../models/guild";

export default class ReadyEvent extends EventTemplate {
  constructor() {
    super({ name: Events.MessageUpdate, once: true });
  }

  public async exec(bot: ForumClient, guild: DjsGuild): Promise<void> {
    bot.logger.info(`Joined guild: ${guild.name} (${guild.id})`);

    const main = Bun.env.GUILD_ID!;
    if (!guild) return;
    if (guild.id !== main) {
      guild.leave();
      return bot.logger.info(`Left guild: ${guild.name} (${guild.id})`);
    } else {
      const createOptions: any = {
        id: guild.id,
        name: guild.name,
      };
      if (guild.icon) {
        createOptions.image = guild.iconURL({
          extension: "png",
        })!;
      }
      if (guild.description) {
        createOptions.description = guild.description;
      }
      // upsert guild
      const dbguild = new Guild(createOptions);
      await dbguild.register();
      bot.logger.info(`Joined main guild: ${guild.name} (${guild.id})`);
    }
  }
}
