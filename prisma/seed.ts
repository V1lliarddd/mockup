import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testConnection() {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL successfully!');
    return true;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    return false;
  }
}

async function main() {
  console.log('Starting seeding...');
  console.log('Checking connection...');
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Not connected!');
  }
  console.log('Cleaning existing data...');
  await prisma.cities.deleteMany();
  await prisma.genders.deleteMany();
  await prisma.skills.deleteMany();
  await prisma.subskills.deleteMany();
  await prisma.user.deleteMany();
  console.log('Creating cities data...');
  await prisma.cities.createMany({
    data: [
      {
        title: 'Москва',
      },
      {
        title: 'Санкт-Петербург',
      },
      {
        title: 'Новосибирск',
      },
      {
        title: 'Екатеринбург',
      },
      {
        title: 'Казань',
      },
      {
        title: 'Мурманск',
      },
      {
        title: 'Владивосток',
      },
      {
        title: 'Иркутск',
      },
      {
        title: 'Тула',
      },
      {
        title: 'Тверь',
      },
      {
        title: 'Воронеж',
      },
      {
        title: 'Махачкала',
      },
    ],
  });
  console.log('Creating genders data...');
  await prisma.genders.createMany({
    data: [
      {
        title: 'male',
      },
      {
        title: 'female',
      },
      {
        title: 'irrelevant',
      },
    ],
  });
  console.log('Creating skills data...');
  await prisma.skills.createMany({
    data: [
      {
        title: 'Бизнес и карьера',
        color: 'light_lavender',
        icon_src: '/assets/skills/BuisnessAndCareerIcon.svg',
      },
      {
        title: 'Творчество и искусство',
        color: 'light_pink',
        icon_src: '/assets/skills/CreativityIcon.svg',
      },
      {
        title: 'Образование и развитие',
        color: 'pale_blue',
        icon_src: '/assets/skills/EducationIcon.svg',
      },
      {
        title: 'Иностранные языки',
        color: 'light_beige',
        icon_src: '/assets/skills/ForeignLanguagesIcon.svg',
      },
      {
        title: 'Здоровье и лайфстайл',
        color: 'pale_green',
        icon_src: '/assets/skills/HealthIcon.svg',
      },
      {
        title: 'Дом и уют',
        color: 'light_peach',
        icon_src: '/assets/skills/HouseIcon.svg',
      },
    ],
  });
  console.log('Creating subskills data...');
  await prisma.subskills.createMany({
    data: [
      {
        title: 'Управление командой',
        skill_id: 1,
      },
      {
        title: 'Маркетинг и реклама',
        skill_id: 1,
      },
      {
        title: 'Продажи и переговоры',
        skill_id: 1,
      },
      {
        title: 'Личный бренд',
        skill_id: 1,
      },
      {
        title: 'Резюме и собеседование',
        skill_id: 1,
      },
      {
        title: 'Тайм-менеджмент',
        skill_id: 1,
      },
      {
        title: 'Проектное управление',
        skill_id: 1,
      },
      {
        title: 'Предпренимательство',
        skill_id: 1,
      },
      {
        title: 'Рисование и иллюстрация',
        skill_id: 2,
      },
      {
        title: 'Фотография',
        skill_id: 2,
      },
      {
        title: 'Видеомонтаж',
        skill_id: 2,
      },
      {
        title: 'Музыка и звук',
        skill_id: 2,
      },
      {
        title: 'Актерское мастерство',
        skill_id: 2,
      },
      {
        title: 'Креативное письмо',
        skill_id: 2,
      },
      {
        title: 'Арт-терапия',
        skill_id: 2,
      },
      {
        title: 'Декор и DIY',
        skill_id: 2,
      },
      {
        title: 'Личностное развитие',
        skill_id: 3,
      },
      {
        title: 'Навыки обучения',
        skill_id: 3,
      },
      {
        title: 'Когнитивные техники',
        skill_id: 3,
      },
      {
        title: 'Скорочтение',
        skill_id: 3,
      },
      {
        title: 'Навыки преподавания',
        skill_id: 3,
      },
      {
        title: 'Коучинг',
        skill_id: 3,
      },
      {
        title: 'Английский',
        skill_id: 4,
      },
      {
        title: 'Французский',
        skill_id: 4,
      },
      {
        title: 'Испанский',
        skill_id: 4,
      },
      {
        title: 'Немецкий',
        skill_id: 4,
      },
      {
        title: 'Китайский',
        skill_id: 4,
      },
      {
        title: 'Японский',
        skill_id: 4,
      },
      {
        title: 'Подготовка к экзаменам (IELTS, TOEFL)',
        skill_id: 4,
      },
      {
        title: 'Йога и медитация',
        skill_id: 5,
      },
      {
        title: 'Питание и ЗОЖ',
        skill_id: 5,
      },
      {
        title: 'Ментальное здоровье',
        skill_id: 5,
      },
      {
        title: 'Осознанность',
        skill_id: 5,
      },
      {
        title: 'Физические тренировки',
        skill_id: 5,
      },
      {
        title: 'Сон и восстановление',
        skill_id: 5,
      },
      {
        title: 'Баланс жизни и работы',
        skill_id: 5,
      },
      {
        title: 'Уборка и организация',
        skill_id: 6,
      },
      {
        title: 'Домашние финансы',
        skill_id: 6,
      },
      {
        title: 'Приготовление еды',
        skill_id: 6,
      },
      {
        title: 'Домашние растения',
        skill_id: 6,
      },
      {
        title: 'Ремонт',
        skill_id: 6,
      },
      {
        title: 'Хранение вещей',
        skill_id: 6,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
