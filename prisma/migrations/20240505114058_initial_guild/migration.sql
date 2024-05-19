-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'This guild has no description',
    "image" TEXT NOT NULL DEFAULT 'https://cdn.discordapp.com/embed/avatars/0.png',

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
