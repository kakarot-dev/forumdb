import { prisma } from "..";

export default class Guild {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(opts: Partial<Guild>) {
    this.id = opts.id ?? "";
    this.name = opts.name ?? "";
    this.description = opts.description ?? "";
    this.image = opts.image ?? "";
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
  }

  public static async getGuildById(id: string): Promise<Guild | null> {
    try {
      const guild = await prisma.guild.findUnique({
        where: {
          id,
        },
      });

      if (!guild) return null;

      return new Guild(guild);
    } catch (e: any) {
      throw new Error(`Error fetching guild: ${e.message}`);
    }
  }

  public async register(): Promise<Guild> {
    try {
      const guild = await prisma.guild.upsert({
        create: {
          ...this,
        },
        where: {
          id: this.id,
        },
        update: {},
      });

      return new Guild(guild);
    } catch (e: any) {
      throw new Error(`Error registering guild: ${e.message}`);
    }
  }

  // public async getChannels(): Promise<Channel[]> {}
}
