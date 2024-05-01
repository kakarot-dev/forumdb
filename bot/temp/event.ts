import type { IEventBase } from "../types/events";

export class EventTemplate implements IEventBase {
  public props: IEventBase["props"];

  constructor(props: IEventBase["props"]) {
    this.props = props;
  }
}
