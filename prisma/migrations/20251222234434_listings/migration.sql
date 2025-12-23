/*
  Warnings:

  - You are about to drop the `Apartment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_agentId_fkey";

-- DropTable
DROP TABLE "Apartment";

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "mainLocation" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "distance" TEXT NOT NULL,
    "description" TEXT,
    "imageUrls" TEXT[],
    "videoUrl" TEXT NOT NULL,
    "hasFence" BOOLEAN DEFAULT false,
    "electricity" BOOLEAN DEFAULT false,
    "water" BOOLEAN DEFAULT false,
    "security" BOOLEAN DEFAULT false,
    "solar" BOOLEAN DEFAULT false,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
