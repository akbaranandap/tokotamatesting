/*
  Warnings:

  - You are about to drop the column `path` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "path",
ADD COLUMN     "fileId" INTEGER NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "productId" SET NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_fileId_key" ON "ProductImage"("fileId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
