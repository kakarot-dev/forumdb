import Tag from "./tags";

export default class Channel {
  public id: string;
  public name: string;
  public topic: string;
  public tags: Tag[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(opts: Partial<Channel>) {
    this.id = opts.id ?? "";
    this.name = opts.name ?? "";
    this.topic = opts.topic ?? "";
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;

    if (opts.tags) {
      this.tags = opts.tags.map((tag) => new Tag(tag));
    } else this.tags = [];
  }
}
