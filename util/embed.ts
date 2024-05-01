import { EmbedBuilder } from "discord.js";
import type { HexColorString, EmbedField } from "discord.js";

export class MessageEmbed extends EmbedBuilder {
  constructor(data: {
    title: string;
    color: HexColorString;
    description: string;
    fields: EmbedField[];
  }) {
    super();

    this.setTitle(data.title);
    this.setDescription(data.description);
    this.setColor(data.color);
    data.fields ? this.setFields(data.fields) : null;
    this.setTimestamp();
    this.setFooter({
      text: "© 2024 - AssistifyLabs",
    });
  }
}
