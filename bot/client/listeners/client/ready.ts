import { ActivityType, Events } from "discord.js";
import type { ForumClient } from "../../forumdb";
import { EventTemplate } from "../../../temp/event";

export default class ReadyEvent extends EventTemplate {
  constructor() {
    super({ name: Events.ClientReady, once: true });
  }

  public async exec(bot: ForumClient): Promise<void> {
    await bot.rest_api.register();

    bot.logger.info(`${bot.user?.tag} is now online and ready!`);

    bot.user?.setStatus("idle");

    bot.user?.setActivity({
      name: "Streaming: com",
      type: ActivityType.Custom,
    });
  }
}
