-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('UPLOADED', 'EXTRACTING_TEXT', 'SPLITTING_CLAUSES', 'ANALYZING_CLAUSES', 'AWAITING_REVIEW', 'REVIEW_SUBMITTED', 'GENERATING_SUMMARY', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ClauseStatus" AS ENUM ('PENDING', 'ANALYZING', 'ANALYZED', 'REVIEWED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "DecisionType" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "extractedText" TEXT,
    "status" "ContractStatus" NOT NULL DEFAULT 'UPLOADED',
    "waitpointTokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clause" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "status" "ClauseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClauseAnalysis" (
    "id" TEXT NOT NULL,
    "clauseId" TEXT NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "riskExplanation" TEXT NOT NULL,
    "ambiguousLanguage" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClauseAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewDecision" (
    "id" TEXT NOT NULL,
    "clauseId" TEXT NOT NULL,
    "decision" "DecisionType" NOT NULL,
    "annotation" TEXT,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalReport" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinalReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClauseAnalysis_clauseId_key" ON "ClauseAnalysis"("clauseId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewDecision_clauseId_key" ON "ReviewDecision"("clauseId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalReport_contractId_key" ON "FinalReport"("contractId");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClauseAnalysis" ADD CONSTRAINT "ClauseAnalysis_clauseId_fkey" FOREIGN KEY ("clauseId") REFERENCES "Clause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewDecision" ADD CONSTRAINT "ReviewDecision_clauseId_fkey" FOREIGN KEY ("clauseId") REFERENCES "Clause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalReport" ADD CONSTRAINT "FinalReport_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
