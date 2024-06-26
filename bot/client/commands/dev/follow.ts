import {
  ChannelType,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";
import { CommandTemplate } from "../../../temp/cmds";
import type { ForumClient } from "../../forumdb";
import { OptionTypes } from "../../../types/cmd";

export default class FollowCommand extends CommandTemplate {
  constructor() {
    super({
      name: "follow",
      description: "Follow a forum channel",
      category: "dev",
      cooldown: 0,
      permissions: {
        dev: true,
        user: ["ManageGuild"],
        bot: ["SendMessages"],
      },
      options: [
        {
          name: "channel",
          description: "The forum channel to index",
          type: OptionTypes.Channel,
          required: true,
          channel_types: [ChannelType.GuildForum],
        },
        {
          name: "include_archives",
          description: "Should archived threads be indexed?",
          type: OptionTypes.Boolean,
          required: true,
        },
      ],
    });
  }

  public async exec(
    bot: ForumClient,
    interaction: ChatInputCommandInteraction<CacheType>,
  ): Promise<void> {
    // Check if guild exists
  }
}
