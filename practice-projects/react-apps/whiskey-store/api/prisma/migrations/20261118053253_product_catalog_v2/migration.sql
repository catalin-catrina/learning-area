/*
  Warnings:

  - You are about to drop the column `age` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `distillery` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCents` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeMl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WhiskyStyle" AS ENUM ('single_malt', 'blended_malt', 'blended', 'single_grain', 'single_pot_still', 'bourbon', 'rye');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "age",
DROP COLUMN "distillery",
DROP COLUMN "price",
DROP COLUMN "type",
ADD COLUMN     "ageYears" INTEGER,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "cask" TEXT,
ADD COLUMN     "compareAtPriceCents" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "giftBox" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "peated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceCents" INTEGER NOT NULL,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "style" "WhiskyStyle" NOT NULL,
ADD COLUMN     "tastingNotes" TEXT[],
ADD COLUMN     "volumeMl" INTEGER NOT NULL,
ALTER COLUMN "region" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductType";

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
