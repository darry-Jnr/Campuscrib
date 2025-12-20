-- CreateEnum
CREATE TYPE "RoomateStatus" AS ENUM ('HAS_HOUSE', 'LOOKING_ONLY', 'SEEN_NOT_PAID');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT,
    "dept" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "status" "RoomateStatus" NOT NULL DEFAULT 'LOOKING_ONLY',
    "gender" TEXT,
    "location" TEXT,
    "bio" TEXT,
    "budget" INTEGER,
    "moveInDate" TIMESTAMP(3),
    "maxRoommates" INTEGER,
    "interests" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
