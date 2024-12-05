-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_technology" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Project_technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience_technology" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Experience_technology_pkey" PRIMARY KEY ("id")
);
