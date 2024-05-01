import * as CommandTypes from "./cmd";
import { Collection } from "discord.js";
import { ForumClient } from "../client/forumdb";

export interface IPermsConfig {
  devs: string[];
}

/**
 * Interface for the Command Handler
 * @property {ForumClient} client - The client instance
 * @property {Collection<string, CommandTypes.ICommand>} commands - The collection of commands
 * @method {get} - Get a command by name
 * @method {all} - Get all commands
 * @method {category} - Get all commands in a category
 * @method {load_public} - Load all public commands
 * @method {load_private} - Load all private (guild only) commands
 */
export interface ICommandHandler {
  client: ForumClient;
  commands: Collection<string, CommandTypes.ICommand>;
  get(name: string): Promise<CommandTypes.ICommand>;
  all(): Collection<string, CommandTypes.ICommand>;
  category(category: string): Collection<string, CommandTypes.ICommand>;
  load(dir: string): void;
}

export interface IError extends Error {
  id?: string;
  name: "ENFINITY_ERROR";
  message: string;
  state: "OPEN" | "INVESTIGATING" | "INFO_NEEDED" | "CLOSED";
  type: "BOT" | "USER" | "GUILD" | "DATABASE" | "UNKNOWN";
  info: string;
  stack: any;
}

export interface IThrowError {
  message: string;
  opts: {
    state: IError["state"];
    type: IError["type"];
    info: IError["info"];
    stack?: IError["stack"];
  };
}
