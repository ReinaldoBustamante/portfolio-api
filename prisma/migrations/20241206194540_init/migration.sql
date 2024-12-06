/*
  Warnings:

  - The primary key for the `Experience_technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Experience_technology` table. All the data in the column will be lost.
  - The primary key for the `Project_technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Project_technology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience_technology" DROP CONSTRAINT "Experience_technology_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Experience_technology_pkey" PRIMARY KEY ("experience_id", "technology_id");

-- AlterTable
ALTER TABLE "Project_technology" DROP CONSTRAINT "Project_technology_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Project_technology_pkey" PRIMARY KEY ("project_id", "technology_id");
