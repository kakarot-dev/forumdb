import { join } from "node:path";
import * as ClientTypes from "../types/client";
import { Client, Collection } from "discord.js";
import type { ClientOptions } from "discord.js";
import { MessageEmbed } from "../../util/embed";
import { CommandHandler } from "../handlers/cmd";
import { EventHandler } from "../handlers/event";
import { DiscordAPI } from "../handlers/rest";
import logger from "../../util/logger";

export class ForumClient extends Client {
  public cooldown = new Collection<string, Collection<string, number>>();
  public MessageEmbed: any = MessageEmbed;
  public rest_api = new DiscordAPI(this);
  public commands = new CommandHandler(this);
  public events = new EventHandler(this);
  public logger = logger;
  public types = ClientTypes;

  constructor(options: ClientOptions) {
    super(options);

    this.init();
    this.handleErrors();
  }

  public async connect(token: string): Promise<void> {
    try {
      await this.login(token);
    } catch (e: any) {
      this.logger.error(`Error initializing client: ${e.stack}`);
    }
  }

  private init(): void {
    // this.prisma = this.db.prisma;
    this.events.load(join(__dirname, "./listeners/"));
    this.commands.load(join(__dirname, "./commands/"));
  }

  private handleErrors(): void {
    /**
     * Handle uncaught exceptions
     * @param {Error} err - The error that was thrown
     * @returns {void}
     */
    process.on("unhandledRejection", (err: Error | ClientTypes.IError) => {
      this.logger.error(`Unhandled Rejection: \n`, err);
    });
    /**
     * Promise rejections that were handled in some form
     * @param {Promise<any>} promise - The promise that was rejected
     * @returns {void}
     */
    process.on("rejectionHandled", (promise: Promise<any>) => {
      this.logger.warn(`Promise rejection handled: ${promise}`);
      this.logger.info(
        "This event is emitted when a promise is rejected, but there is an attached handler for the rejection.",
      );
      this.logger.info("In most cases, this warning can safely be ignored.");
    });

    /**
     * Handle uncaught exceptions
     * @param {Error} err - The error that was thrown
     * @returns {void}
     */
    process.on("uncaughtException", (err: Error) => {
      this.logger.error(`Uncaught Exception: \n`, err);
    });
    /**
     * Handle warnings
     * @param {Error} warning - The warning that was thrown
     * @returns {void}
     */
    process.on("warning", (warning: Error) => {
      this.logger.warn(`Warning: ${warning.message}`);
      this.logger.info(
        "This event is emitted when Node.js prints a warning to stderr or stdout.",
      );
      this.logger.info("In most cases, this warning can safely be ignored.");
    });

    /**
     * Handle uncaught exceptions
     * @param {Error} err - The error that was thrown
     * @returns {void}
     */
    process.on("uncaughtExceptionMonitor", (err: Error) => {
      this.logger.error(`Uncaught Exception Monitor: \n`, err);
    });
  }
}
