-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCanTeach" (
    "user_id" INTEGER NOT NULL,
    "subskill_id" INTEGER NOT NULL,

    CONSTRAINT "UserCanTeach_pkey" PRIMARY KEY ("user_id","subskill_id")
);

-- CreateTable
CREATE TABLE "UserWantsToLearn" (
    "user_id" INTEGER NOT NULL,
    "subskill_id" INTEGER NOT NULL,

    CONSTRAINT "UserWantsToLearn_pkey" PRIMARY KEY ("user_id","subskill_id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genders" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subskills" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "Subskills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCanTeach" ADD CONSTRAINT "UserCanTeach_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCanTeach" ADD CONSTRAINT "UserCanTeach_subskill_id_fkey" FOREIGN KEY ("subskill_id") REFERENCES "Subskills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWantsToLearn" ADD CONSTRAINT "UserWantsToLearn_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWantsToLearn" ADD CONSTRAINT "UserWantsToLearn_subskill_id_fkey" FOREIGN KEY ("subskill_id") REFERENCES "Subskills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subskills" ADD CONSTRAINT "Subskills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
