import {
  Collection,
  ApplicationCommandOptionType,
  Colors,
  Events,
} from "discord.js";
import type { CacheType, Interaction, BaseInteraction } from "discord.js";
import type { ForumClient } from "../../forumdb";
import { EventTemplate } from "../../../temp/event";

export default class ReadyEvent extends EventTemplate {
  constructor() {
    super({ name: Events.InteractionCreate });
  }

  public async exec(
    bot: ForumClient,
    interaction: Interaction<CacheType>,
    _int: BaseInteraction,
  ): Promise<void> {
    if (!interaction.isCommand()) return;

    if (!interaction.inGuild()) return;
    const main = Bun.env.GUILD_ID!;
    if (interaction.guildId !== main) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new bot.MessageEmbed({
            title: "Error: wrong guild",
            description: "Sorry chief, I can only be used in the main server!",
            color: Colors.Red,
          }),
        ],
      });
      await interaction.guild?.leave();
      bot.logger.info(
        `Left guild: ${interaction.guild?.name} (${interaction.guild?.id})`,
      );
      return;
    }
    const command = await bot.commands.get(interaction.commandName);

    if (!command) return;

    if (
      command.props.permissions?.user &&
      !interaction.memberPermissions?.has(command.props.permissions.user)
    ) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new bot.MessageEmbed({
            title: "Error: missing permissions",
            description: `You need the following permissions to run this command: \`${command.props.permissions.user.join("`, `")}\``,
            color: Colors.Red,
          }),
        ],
      });
      return;
    }

    if (bot && bot.user && command.props.permissions?.bot) {
      const botMember = interaction?.guild?.members.cache.get(bot.user.id);
      if (
        botMember &&
        !botMember.permissions.has(command.props.permissions.bot)
      ) {
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new bot.MessageEmbed({
              title: "Error: missing permissions",
              description: `I need the following permissions to run this command: \`${command.props.permissions.bot.join("`, `")}\``,
              color: Colors.Red,
            }),
          ],
        });
        return;
      }
    }

    if (command.props.permissions?.dev) {
      const dev = bot.guilds.cache
        .get(Bun.env.GUILD_ID!)
        ?.members.fetch(interaction.user.id);
      const dev_role = Bun.env.DEV_ROLE_ID!;

      if (dev && !(await dev).roles.cache.has(dev_role)) {
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new bot.MessageEmbed({
              title: "Error: missing permissions",
              description: `Sorry chief, only my developers can use this command!`,
              color: Colors.Red,
            }),
          ],
        });
        return;
      }
    }

    if (command.props.cooldown > 0) {
      if (!bot.cooldown.has(command.props.name)) {
        bot.cooldown.set(command.props.name, new Collection());
      }

      const now = Date.now();

      const timestamp = bot.cooldown.get(command.props.name);
      const cooldownTime = command.props.cooldown * 1000;

      if (timestamp?.has(interaction.user.id)) {
        const cooldown = timestamp.get(interaction.user.id);

        if (cooldown) {
          const expires = cooldown + cooldownTime;

          if (now < expires) {
            const remaining = (expires - now) / 1000;

            await interaction.reply({
              ephemeral: true,
              content:
                "Slow down chief! You need to wait another " +
                remaining.toFixed(1) +
                " seconds before you can use this command again!",
            });
            return;
          }
        }
      }

      timestamp?.set(interaction.user.id, now);

      setTimeout(() => timestamp?.delete(interaction.user.id), cooldownTime);
    }

    const args: any = [];

    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);

        option.options?.forEach((x: any) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      command.exec(bot, interaction, args);
    } catch (err: any) {
      bot.logger.error(`Failed to execute command: ${command.props.name}`);
      bot.logger.error(err.stack);
      await interaction.reply({
        ephemeral: true,
        content:
          "Whoops, something went wrong while executing this command! Please try again later!",
      });
      return;
    }
  }
}
