/*
  Warnings:

  - A unique constraint covering the columns `[answerToken]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answerToken` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answerToken" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_answerToken_key" ON "Question"("answerToken");
