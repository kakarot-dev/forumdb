import { prisma } from "..";

export default class Tag {
  public id: string;
  public name: string;
  public emoji?: string | null;
  public channelId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(opts: Partial<Tag>) {
    this.id = opts.id ?? "";
    this.name = opts.name ?? "";
    this.emoji = opts.emoji ?? "";
    this.channelId = opts.channelId ?? "";
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
  }
  public async register(): Promise<Tag> {
    try {
      const tag = await prisma.tag.upsert({
        create: {
          ...this,
        },
        where: {
          id: this.id,
        },
        update: {},
      });

      return new Tag(tag);
    } catch (e: any) {
      throw new Error(`Error registering tag: ${e.message}`);
    }
  }
}
