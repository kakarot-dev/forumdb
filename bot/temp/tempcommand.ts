import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import { ForumClient } from "../client/forumdb";
import { CommandTemplate } from "./cmds";

export default class SampleCommand extends CommandTemplate {
  constructor() {
    super({
      name: "some_name", // Replace this with the command name
      description: "some_description", // Replace this with the command description
      category: "some_category", // Replace this with the command category
      cooldown: 0, // Replace this with the command cooldown
      permissions: {
        dev: false,
        user: ["SendMessages"],
        bot: ["SendMessages"],
      },
    });
  }

  public async exec(
    bot: ForumClient,
    interaction: ChatInputCommandInteraction<CacheType>,
  ): Promise<any> {
    return interaction.reply({
      embeds: [
        new bot.MessageEmbed({
          title: "Sample Command",
          description: "Sample command description",
        }),
      ],
    });
  }
}
