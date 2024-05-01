import type { Events } from "discord.js";

export interface IEvent {
  props: IEventProps;
  exec: (...args: unknown[]) => void;
}

export interface IEventProps {
  name: Events;
  once?: boolean;
}

export interface IEventBase {
  props: IEventProps;
}
