/*
  Warnings:

  - You are about to drop the column `access` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refresh]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "access",
DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Token_refresh_key" ON "Token"("refresh");
