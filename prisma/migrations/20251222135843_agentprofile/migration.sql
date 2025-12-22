/*
  Warnings:

  - You are about to drop the `agent_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('REGISTERED', 'IDENTITY_VERIFIED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "agent_profiles" DROP CONSTRAINT "agent_profiles_userId_fkey";

-- DropTable
DROP TABLE "agent_profiles";

-- CreateTable
CREATE TABLE "AgentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "agentType" TEXT NOT NULL,
    "yearsOfExperience" INTEGER DEFAULT 0,
    "whatsappNumber" TEXT NOT NULL,
    "backupNumber" TEXT,
    "officeAddress" TEXT,
    "responseTime" TEXT,
    "nin" TEXT,
    "association" TEXT,
    "status" "VerificationStatus" NOT NULL DEFAULT 'REGISTERED',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgentProfile_userId_key" ON "AgentProfile"("userId");

-- AddForeignKey
ALTER TABLE "AgentProfile" ADD CONSTRAINT "AgentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
