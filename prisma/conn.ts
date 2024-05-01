import { PrismaClient } from "@prisma/client";
import logger from "../bot/util/logger";

const prisma = new PrismaClient();

prisma.$connect();
logger.info("🔗 Connected to Prisma 🔗");
