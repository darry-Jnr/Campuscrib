-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "mainLocation" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "distance" TEXT NOT NULL,
    "description" TEXT,
    "imageUrls" TEXT[],
    "videoUrl" TEXT,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
