/*
  Warnings:

  - Added the required column `experience_id` to the `Experience_technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_id` to the `Experience_technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Project_technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology_id` to the `Project_technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience_technology" ADD COLUMN     "experience_id" INTEGER NOT NULL,
ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project_technology" ADD COLUMN     "project_id" INTEGER NOT NULL,
ADD COLUMN     "technology_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project_technology" ADD CONSTRAINT "Project_technology_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_technology" ADD CONSTRAINT "Project_technology_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience_technology" ADD CONSTRAINT "Experience_technology_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience_technology" ADD CONSTRAINT "Experience_technology_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
