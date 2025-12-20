/*
  Warnings:

  - You are about to drop the column `avatar` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `maxRoommates` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `moveInDate` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avatar",
DROP COLUMN "budget",
DROP COLUMN "interests",
DROP COLUMN "maxRoommates",
DROP COLUMN "moveInDate",
DROP COLUMN "phone",
DROP COLUMN "school",
DROP COLUMN "status",
DROP COLUMN "verified",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "verification";

-- DropEnum
DROP TYPE "RoomateStatus";
