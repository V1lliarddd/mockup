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
  console.log('🌱 Starting seeding...');

  console.log('Checking connection...');
  const isConnected = testConnection();
  if (!isConnected) {
    throw new Error('Not connected!');
  }

  console.log('🧹 Cleaning existing data...');
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating data...');
  await prisma.user.createMany({
    data: [
      {
        email: 'my-email@mail.ru',
        firstName: 'Vlad',
        lastName: 'Saveliev',
        birthDate: new Date('2004-05-16'),
      },
      {
        email: 'some-cool-email@gmail.com',
        firstName: 'Alexandr',
        lastName: 'Malyshev',
        birthDate: new Date('1999-07-01'),
      },
      {
        email: 'nihilist-bueno@gmail.com',
        firstName: 'Svetlana',
        lastName: 'Rudskaya',
        birthDate: new Date('2001-02-12'),
      },
      {
        email: 'not-another-email@gmail.com',
        firstName: 'Elena',
        lastName: 'Vinitskaya',
        birthDate: new Date('2002-09-24'),
      },
    ],
  });

  await prisma.todo.createMany({
    data: [
      {
        title: 'Сходить за хлебом',
        description: 'Хлеба дома нет :(',
        deadline: new Date('2026-07-15'),
      },
      {
        title: 'Сделать уборку',
        description: 'Грязно как-то',
        deadline: new Date('2026-07-15'),
      },
      {
        title: 'Выучить React',
        description: 'Для успешной карьеры в IT',
        deadline: new Date('2026-10-01'),
      },
      {
        title: 'Закончить практикум',
        description: 'Ну что я, зря платил что-ли?',
        deadline: new Date('2026-12-31'),
      },
      {
        title: 'Покормить кота',
        description: 'Голодный, холодный и орет постоянно',
        deadline: new Date('2026-07-15'),
      },
    ],
  });
  console.log(`✅ Data created`);
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
