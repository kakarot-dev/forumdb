import type { ICommandBase } from "../types/cmd";

export class CommandTemplate implements ICommandBase {
  public props: ICommandBase["props"];

  constructor(props: ICommandBase["props"]) {
    this.props = props;
  }
}
