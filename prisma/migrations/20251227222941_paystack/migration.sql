-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "profilesViewed" TEXT[] DEFAULT ARRAY[]::TEXT[];
