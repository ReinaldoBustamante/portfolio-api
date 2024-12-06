/*
  Warnings:

  - You are about to drop the `Experience_technology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project_technology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience_technology" DROP CONSTRAINT "Experience_technology_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "Experience_technology" DROP CONSTRAINT "Experience_technology_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "Project_technology" DROP CONSTRAINT "Project_technology_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Project_technology" DROP CONSTRAINT "Project_technology_technology_id_fkey";

-- DropTable
DROP TABLE "Experience_technology";

-- DropTable
DROP TABLE "Project_technology";

-- CreateTable
CREATE TABLE "_ExperienceToTechnology" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExperienceToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectToTechnology" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExperienceToTechnology_B_index" ON "_ExperienceToTechnology"("B");

-- CreateIndex
CREATE INDEX "_ProjectToTechnology_B_index" ON "_ProjectToTechnology"("B");

-- AddForeignKey
ALTER TABLE "_ExperienceToTechnology" ADD CONSTRAINT "_ExperienceToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToTechnology" ADD CONSTRAINT "_ExperienceToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
