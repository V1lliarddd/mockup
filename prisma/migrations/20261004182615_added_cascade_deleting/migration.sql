-- DropForeignKey
ALTER TABLE "Subskills" DROP CONSTRAINT "Subskills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_city_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gender_id_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Genders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subskills" ADD CONSTRAINT "Subskills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
