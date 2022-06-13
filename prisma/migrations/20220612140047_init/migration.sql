/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `refresh` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_id_key";

-- DropIndex
DROP INDEX "Token_refresh_key";

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
DROP COLUMN "id",
DROP COLUMN "refresh",
ADD COLUMN     "token" TEXT NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
