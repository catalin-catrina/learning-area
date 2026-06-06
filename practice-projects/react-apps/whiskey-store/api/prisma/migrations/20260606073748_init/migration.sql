/*
  Warnings:

  - Changed the type of `type` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('single_malt', 'blended_scotch', 'blended_malt', 'bourbon', 'rye', 'irish', 'japanese');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "type",
ADD COLUMN     "type" "ProductType" NOT NULL;
