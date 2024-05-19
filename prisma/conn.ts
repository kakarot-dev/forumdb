import { PrismaClient } from "@prisma/client";
import logger from "../util/logger";
import type { ForumClient } from "../bot/client/forumdb";
// Make a class
export default class {
  private client: ForumClient;
  public prisma: PrismaClient;
  constructor(client: ForumClient) {
    this.client = client;
    this.prisma = new PrismaClient();
  }
  // CONNECT TO DATABASE
  public async connect() {
    try {
      await this.prisma.$connect();
      logger.info("🔗 Connected to database 🔗 ");
    } catch (e: any) {
      logger.error(`Error connecting to database: ${e.stack}`);
    }
  }
}
