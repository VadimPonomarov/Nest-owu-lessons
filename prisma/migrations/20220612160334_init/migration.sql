/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");
