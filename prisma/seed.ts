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
  await prisma.user.deleteMany();
  await prisma.cities.deleteMany();
  await prisma.genders.deleteMany();
  await prisma.userCanTeach.deleteMany();
  await prisma.userWantsToLearn.deleteMany();
  await prisma.subskills.deleteMany();
  await prisma.skills.deleteMany();
  console.log('Creating cities data...');
  await prisma.cities.createMany({
    data: [
      {
        id: 1,
        title: 'Москва'
      },
      {
        id: 2,
        title: 'Санкт-Петербург'
      },
      {
        id: 3,
        title: 'Новосибирск'
      },
      {
        id: 4,
        title: 'Екатеринбург'
      },
      {
        id: 5,
        title: 'Казань'
      },
      {
        id: 6,
        title: 'Мурманск'
      },
      {
        id: 7,
        title: 'Владивосток'
      },
      {
        id: 8,
        title: 'Иркутск'
      },
      {
        id: 9,
        title: 'Тула'
      },
      {
        id: 10,
        title: 'Тверь'
      },
      {
        id: 11,
        title: 'Воронеж'
      },
      {
        id: 12,
        title: 'Махачкала'
      }
    ]
  });
  console.log('Creating genders data...');
  await prisma.genders.createMany({
    data: [
      {
        id: 1,
        title: 'male'
      },
      {
        id: 2,
        title: 'female'
      },
      {
        id: 3,
        title: 'irrelevant'
      }
    ]
  });
  console.log('Creating skills data...');
  await prisma.skills.createMany({
    data: [
      {
        id: 1,
        title: 'Бизнес и карьера',
        color: 'light_lavender',
        icon_src: '/assets/skills/BuisnessAndCareerIcon.svg'
      },
      {
        id: 2,
        title: 'Творчество и искусство',
        color: 'light_pink',
        icon_src: '/assets/skills/CreativityIcon.svg'
      },
      {
        id: 3,
        title: 'Образование и развитие',
        color: 'pale_blue',
        icon_src: '/assets/skills/EducationIcon.svg'
      },
      {
        id: 4,
        title: 'Иностранные языки',
        color: 'light_beige',
        icon_src: '/assets/skills/ForeignLanguagesIcon.svg'
      },
      {
        id: 5,
        title: 'Здоровье и лайфстайл',
        color: 'pale_green',
        icon_src: '/assets/skills/HealthIcon.svg'
      },
      {
        id: 6,
        title: 'Дом и уют',
        color: 'light_peach',
        icon_src: '/assets/skills/HouseIcon.svg'
      }
    ]
  });
  console.log('Creating subskills data...');
  await prisma.subskills.createMany({
    data: [
      {
        id: 1,
        title: 'Управление командой',
        skill_id: 1
      },
      {
        id: 2,
        title: 'Маркетинг и реклама',
        skill_id: 1
      },
      {
        id: 3,
        title: 'Продажи и переговоры',
        skill_id: 1
      },
      {
        id: 4,
        title: 'Личный бренд',
        skill_id: 1
      },
      {
        id: 5,
        title: 'Резюме и собеседование',
        skill_id: 1
      },
      {
        id: 6,
        title: 'Тайм-менеджмент',
        skill_id: 1
      },
      {
        id: 7,
        title: 'Проектное управление',
        skill_id: 1
      },
      {
        id: 8,
        title: 'Предпренимательство',
        skill_id: 1
      },
      {
        id: 9,
        title: 'Рисование и иллюстрация',
        skill_id: 2
      },
      {
        id: 10,
        title: 'Фотография',
        skill_id: 2
      },
      {
        id: 11,
        title: 'Видеомонтаж',
        skill_id: 2
      },
      {
        id: 12,
        title: 'Музыка и звук',
        skill_id: 2
      },
      {
        id: 13,
        title: 'Актерское мастерство',
        skill_id: 2
      },
      {
        id: 14,
        title: 'Креативное письмо',
        skill_id: 2
      },
      {
        id: 15,
        title: 'Арт-терапия',
        skill_id: 2
      },
      {
        id: 16,
        title: 'Декор и DIY',
        skill_id: 2
      },
      {
        id: 17,
        title: 'Личностное развитие',
        skill_id: 3
      },
      {
        id: 18,
        title: 'Навыки обучения',
        skill_id: 3
      },
      {
        id: 19,
        title: 'Когнитивные техники',
        skill_id: 3
      },
      {
        id: 20,
        title: 'Скорочтение',
        skill_id: 3
      },
      {
        id: 21,
        title: 'Навыки преподавания',
        skill_id: 3
      },
      {
        id: 22,
        title: 'Коучинг',
        skill_id: 3
      },
      {
        id: 23,
        title: 'Английский',
        skill_id: 4
      },
      {
        id: 24,
        title: 'Французский',
        skill_id: 4
      },
      {
        id: 25,
        title: 'Испанский',
        skill_id: 4
      },
      {
        id: 26,
        title: 'Немецкий',
        skill_id: 4
      },
      {
        id: 27,
        title: 'Китайский',
        skill_id: 4
      },
      {
        id: 28,
        title: 'Японский',
        skill_id: 4
      },
      {
        id: 29,
        title: 'Подготовка к экзаменам (IELTS, TOEFL)',
        skill_id: 4
      },
      {
        id: 30,
        title: 'Йога и медитация',
        skill_id: 5
      },
      {
        id: 31,
        title: 'Питание и ЗОЖ',
        skill_id: 5
      },
      {
        id: 32,
        title: 'Ментальное здоровье',
        skill_id: 5
      },
      {
        id: 33,
        title: 'Осознанность',
        skill_id: 5
      },
      {
        id: 34,
        title: 'Физические тренировки',
        skill_id: 5
      },
      {
        id: 35,
        title: 'Сон и восстановление',
        skill_id: 5
      },
      {
        id: 36,
        title: 'Баланс жизни и работы',
        skill_id: 5
      },
      {
        id: 37,
        title: 'Уборка и организация',
        skill_id: 6
      },
      {
        id: 38,
        title: 'Домашние финансы',
        skill_id: 6
      },
      {
        id: 39,
        title: 'Приготовление еды',
        skill_id: 6
      },
      {
        id: 40,
        title: 'Домашние растения',
        skill_id: 6
      },
      {
        id: 41,
        title: 'Ремонт',
        skill_id: 6
      },
      {
        id: 42,
        title: 'Хранение вещей',
        skill_id: 6
      }
    ]
  });
  console.log('Creating user data...');
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        bio: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
        email: 'ivan@mail.ru',
        password: '12345',
        name: 'Иван',
        image_path: 'avatar-1.jpg',
        gender_id: 1,
        birth_date: new Date('2002-07-10'),
        city_id: 1,
        likes_count: 12,
        creation_date: new Date('2023-01-15T10:23:00'),
        refreshToken: ''
      },
      {
        id: 2,
        bio: 'Учу английскому без скучных правил. Верю, что язык — это привычка, а не зубрёжка.',
        email: 'anna@mail.ru',
        password: '12345',
        name: 'Анна',
        image_path: 'avatar-2.jpg',
        gender_id: 2,
        birth_date: new Date('2001-02-15'),
        city_id: 5,
        likes_count: 10,
        creation_date: new Date('2023-02-08T14:47:00'),
        refreshToken: ''
      },
      {
        id: 3,
        bio: 'Помогаю превращать идеи в планы. Сам учусь замедляться и не выгорать.',
        email: 'max@mail.ru',
        password: '12345',
        name: 'Максим',
        image_path: 'avatar-3.jpg',
        gender_id: 1,
        birth_date: new Date('2005-08-01'),
        city_id: 3,
        likes_count: 5,
        creation_date: new Date('2023-03-21T09:12:00'),
        refreshToken: ''
      },
      {
        id: 4,
        bio: 'Обожаю разговоры на английском за чашкой чая. Ищу баланс между «успеть всё» и «просто побыть».',
        email: 'ilona@mail.ru',
        password: '12345',
        name: 'Илона',
        image_path: 'avatar-4.jpg',
        gender_id: 2,
        birth_date: new Date('2000-05-12'),
        city_id: 1,
        likes_count: 0,
        creation_date: new Date('2023-04-17T18:35:00'),
        refreshToken: ''
      },
      {
        id: 5,
        bio: 'Английский — моя работа, медитация — мой отдых. Учу и то, и другое.',
        email: 'mihail@mail.ru',
        password: '12345',
        name: 'Михаил',
        image_path: 'avatar-5.jpg',
        gender_id: 1,
        birth_date: new Date('2002-07-10'),
        city_id: 7,
        likes_count: 0,
        creation_date: new Date('2023-05-30T11:08:00'),
        refreshToken: ''
      },
      {
        id: 6,
        bio: 'Играю на гитаре и пою, когда никто не слышит. Хочу выучить французский и наконец успевать всё.',
        email: 'olga@mail.ru',
        password: '12345',
        name: 'Ольга',
        image_path: 'avatar-6.jpg',
        gender_id: 2,
        birth_date: new Date('1999-11-23'),
        city_id: 2,
        likes_count: 8,
        creation_date: new Date('2023-06-12T16:54:00'),
        refreshToken: ''
      },
      {
        id: 7,
        bio: 'Ловлю моменты в кадре и склеиваю их в истории. Учусь дышать и не торопиться.',
        email: 'dmitry@mail.ru',
        password: '12345',
        name: 'Дмитрий',
        image_path: 'avatar-7.jpg',
        gender_id: 1,
        birth_date: new Date('2003-03-17'),
        city_id: 4,
        likes_count: 14,
        creation_date: new Date('2023-07-25T08:41:00'),
        refreshToken: ''
      },
      {
        id: 8,
        bio: 'Пеку так, что соседи стучатся в дверь. Могу научить и вас — только приходите с настроением.',
        email: 'elena@mail.ru',
        password: '12345',
        name: 'Елена',
        image_path: 'avatar-8.jpg',
        gender_id: 2,
        birth_date: new Date('1997-06-30'),
        city_id: 6,
        likes_count: 21,
        creation_date: new Date('2023-08-19T13:26:00'),
        refreshToken: ''
      },
      {
        id: 9,
        bio: 'Пишу код и рисую интерфейсы. Иногда забываю поесть — работаю над этим.',
        email: 'sergey@mail.ru',
        password: '12345',
        name: 'Сергей',
        image_path: 'avatar-9.jpg',
        gender_id: 1,
        birth_date: new Date('2004-01-09'),
        city_id: 1,
        likes_count: 3,
        creation_date: new Date('2023-09-04T20:17:00'),
        refreshToken: ''
      },
      {
        id: 10,
        bio: 'Hablamos? Учу языкам через песни и мемы. Серьёзно — это работает.',
        email: 'kate@mail.ru',
        password: '12345',
        name: 'Екатерина',
        image_path: 'avatar-10.jpg',
        gender_id: 2,
        birth_date: new Date('2000-09-14'),
        city_id: 3,
        likes_count: 17,
        creation_date: new Date('2023-10-28T07:59:00'),
        refreshToken: ''
      },
      {
        id: 11,
        bio: 'Играю в шахматы с пяти лет. Люблю думать на два шага вперёд — и в игре, и в жизни.',
        email: 'andrey@mail.ru',
        password: '12345',
        name: 'Андрей',
        image_path: 'avatar-11.jpg',
        gender_id: 1,
        birth_date: new Date('1998-04-02'),
        city_id: 5,
        likes_count: 9,
        creation_date: new Date('2023-11-16T15:33:00'),
        refreshToken: ''
      },
      {
        id: 12,
        bio: 'Рисую всё, что вижу, и пишу буквы, которые хочется рассматривать. Учусь не спешить.',
        email: 'maria@mail.ru',
        password: '12345',
        name: 'Мария',
        image_path: 'avatar-12.jpg',
        gender_id: 2,
        birth_date: new Date('2006-12-25'),
        city_id: 7,
        likes_count: 2,
        creation_date: new Date('2023-12-09T12:05:00'),
        refreshToken: ''
      },
      {
        id: 13,
        bio: 'Йога по утрам, бассейн по вечерам. Тело — это тоже навык, и я его тренирую.',
        email: 'alexey@mail.ru',
        password: '12345',
        name: 'Алексей',
        image_path: 'avatar-13.jpg',
        gender_id: 1,
        birth_date: new Date('2001-07-19'),
        city_id: 2,
        likes_count: 11,
        creation_date: new Date('2024-01-22T17:48:00'),
        refreshToken: ''
      },
      {
        id: 14,
        bio: 'Пою в душе, стучу по всему, что попадает под руку. Музыка — мой способ говорить.',
        email: 'sofia@mail.ru',
        password: '12345',
        name: 'София',
        image_path: 'avatar-14.jpg',
        gender_id: 2,
        birth_date: new Date('2003-10-08'),
        city_id: 4,
        likes_count: 6,
        creation_date: new Date('2024-02-14T10:31:00'),
        refreshToken: ''
      },
      {
        id: 15,
        bio: 'Снимаю, монтирую, пересматриваю. Иногда забываю выключить камеру — так и живу.',
        email: 'nikita@mail.ru',
        password: '12345',
        name: 'Никита',
        image_path: 'avatar-15.jpg',
        gender_id: 1,
        birth_date: new Date('1996-02-11'),
        city_id: 6,
        likes_count: 25,
        creation_date: new Date('2024-03-27T19:14:00'),
        refreshToken: ''
      },
      {
        id: 16,
        bio: 'Немецкий — для точности, английский — для свободы. Учу обоим и не жалею.',
        email: 'victoria@mail.ru',
        password: '12345',
        name: 'Виктория',
        image_path: 'avatar-16.jpg',
        gender_id: 2,
        birth_date: new Date('2002-05-27'),
        city_id: 1,
        likes_count: 13,
        creation_date: new Date('2024-04-18T08:52:00'),
        refreshToken: ''
      },
      {
        id: 17,
        bio: 'Делаю сайты, которые не хочется закрывать. Учусь тому же в жизни — не закрываться.',
        email: 'pavel@mail.ru',
        password: '12345',
        name: 'Павел',
        image_path: 'avatar-17.jpg',
        gender_id: 1,
        birth_date: new Date('1999-08-03'),
        city_id: 3,
        likes_count: 7,
        creation_date: new Date('2024-05-23T14:09:00'),
        refreshToken: ''
      },
      {
        id: 18,
        bio: 'В воде я дома. На суше — учусь балансу и планированию.',
        email: 'alina@mail.ru',
        password: '12345',
        name: 'Алина',
        image_path: 'avatar-18.jpg',
        gender_id: 2,
        birth_date: new Date('2005-01-21'),
        city_id: 5,
        likes_count: 4,
        creation_date: new Date('2024-06-30T21:37:00'),
        refreshToken: ''
      },
      {
        id: 19,
        bio: 'Расскажу, как продвигать идеи без бюджета. Сам учусь тишине и восточной мудрости.',
        email: 'roman@mail.ru',
        password: '12345',
        name: 'Роман',
        image_path: 'avatar-19.jpg',
        gender_id: 1,
        birth_date: new Date('1995-11-05'),
        city_id: 7,
        likes_count: 19,
        creation_date: new Date('2024-07-11T09:26:00'),
        refreshToken: ''
      },
      {
        id: 20,
        bio: 'Пишу от руки, потому что в этом есть магия. Ищу её и в повседневных делах.',
        email: 'daria@mail.ru',
        password: '12345',
        name: 'Дарья',
        image_path: 'avatar-20.jpg',
        gender_id: 2,
        birth_date: new Date('2004-06-16'),
        city_id: 2,
        likes_count: 1,
        creation_date: new Date('2024-08-05T16:43:00'),
        refreshToken: ''
      }
    ]
  });
  console.log('Creating user_wants_to_learn data...');
  console.log('Creating user_wants_to_learn data...');
  await prisma.userWantsToLearn.createMany({
    data: [
      { user_id: 1, subskill_id: 12 },
      { user_id: 2, subskill_id: 23 },
      { user_id: 3, subskill_id: 4 },
      { user_id: 4, subskill_id: 23 },
      { user_id: 5, subskill_id: 23 },
      { user_id: 6, subskill_id: 7 },
      { user_id: 7, subskill_id: 15 },
      { user_id: 8, subskill_id: 18 },
      { user_id: 9, subskill_id: 2 },
      { user_id: 10, subskill_id: 21 },
      { user_id: 11, subskill_id: 9 },
      { user_id: 12, subskill_id: 14 },
      { user_id: 13, subskill_id: 6 },
      { user_id: 14, subskill_id: 11 },
      { user_id: 15, subskill_id: 17 },
      { user_id: 16, subskill_id: 22 },
      { user_id: 17, subskill_id: 3 },
      { user_id: 18, subskill_id: 20 },
      { user_id: 19, subskill_id: 5 },
      { user_id: 20, subskill_id: 13 }
    ]
  });
  console.log('Creating user_can_teach data...');
  await prisma.userCanTeach.createMany({
    data: [
      {
        title: 'Игра на барабанах',
        description:
          'Учу играть любимые ритмы с нуля. Разберём грув, координацию и посадку.',
        image_1: 'drums-1.jpg',
        image_2: 'drums-2.jpg',
        image_3: 'drums-3.jpg',
        image_4: 'drums-4.jpg',
        user_id: 1,
        subskill_id: 12
      },
      {
        title: 'Английский язык',
        description:
          'Английский для путешествий и работы. Учим живые фразы, а не правила ради правил.',
        image_1: 'english-1.jpg',
        image_2: 'english-2.jpg',
        image_3: 'english-3.jpg',
        image_4: 'english-4.jpg',
        user_id: 2,
        subskill_id: 23
      },
      {
        title: 'Бизнес-планирование',
        description:
          'Помогу превратить идею в рабочий бизнес-план. Разберём рынок, юнит-экономику и риски.',
        image_1: 'business-1.jpg',
        image_2: 'business-2.jpg',
        image_3: 'business-3.jpg',
        image_4: 'business-4.jpg',
        user_id: 3,
        subskill_id: 7
      },
      {
        title: 'Английский язык',
        description:
          'Английский с нуля или для повышения уровня. Много разговорной практики.',
        image_1: 'english-1.jpg',
        image_2: 'english-2.jpg',
        image_3: 'english-3.jpg',
        image_4: 'english-4.jpg',
        user_id: 4,
        subskill_id: 23
      },
      {
        title: 'Английский язык',
        description:
          'Подготовка к IELTS и TOEFL. Работаем над всеми секциями, тренируем тайминг.',
        image_1: 'english-1.jpg',
        image_2: 'english-2.jpg',
        image_3: 'english-3.jpg',
        image_4: 'english-4.jpg',
        user_id: 5,
        subskill_id: 29
      },
      {
        title: 'Гитара',
        description:
          'Учу играть на гитаре с нуля. Аккорды, бой, первые песни — уже через месяц.',
        image_1: 'guitar-1.jpg',
        image_2: 'guitar-2.jpg',
        image_3: 'guitar-3.jpg',
        image_4: 'guitar-4.jpg',
        user_id: 6,
        subskill_id: 12
      },
      {
        title: 'Фотография',
        description:
          'Помогу освоить камеру и композицию. Разберём свет, кадр и обработку.',
        image_1: 'photo-1.jpg',
        image_2: 'photo-2.jpg',
        image_3: 'photo-3.jpg',
        image_4: 'photo-4.jpg',
        user_id: 7,
        subskill_id: 10
      },
      {
        title: 'Кулинария',
        description:
          'Готовлю просто и вкусно. Научу базовым техникам и покажу, что готовить — это легко.',
        image_1: 'cooking-1.jpg',
        image_2: 'cooking-2.jpg',
        image_3: 'cooking-3.jpg',
        image_4: 'cooking-4.jpg',
        user_id: 8,
        subskill_id: 39
      },
      {
        title: 'Программирование',
        description:
          'Учу программировать с нуля. Основы, практика, реальные проекты.',
        image_1: 'programming-1.jpg',
        image_2: 'programming-2.jpg',
        image_3: 'programming-3.jpg',
        image_4: 'programming-4.jpg',
        user_id: 9,
        subskill_id: 19
      },
      {
        title: 'Испанский язык',
        description:
          'Испанский с носителем языка. Учим не по учебникам, а по жизни.',
        image_1: 'spanish-1.jpg',
        image_2: 'spanish-2.jpg',
        image_3: 'spanish-3.jpg',
        image_4: 'spanish-4.jpg',
        user_id: 10,
        subskill_id: 25
      },
      {
        title: 'Шахматы',
        description:
          'От новичка до уверенного игрока. Тактика, стратегия, разбор партий.',
        image_1: 'chess-1.jpg',
        image_2: 'chess-2.jpg',
        image_3: 'chess-3.jpg',
        image_4: 'chess-4.jpg',
        user_id: 11,
        subskill_id: 19
      },
      {
        title: 'Рисование',
        description:
          'Учу рисовать с нуля. Скетчи, портреты, скетчбук как привычка.',
        image_1: 'drawing-1.jpg',
        image_2: 'drawing-2.jpg',
        image_3: 'drawing-3.jpg',
        image_4: 'drawing-4.jpg',
        user_id: 12,
        subskill_id: 9
      },
      {
        title: 'Йога',
        description:
          'Йога для тела и головы. Мягкий подход, дыхание, гибкость.',
        image_1: 'yoga-1.jpg',
        image_2: 'yoga-2.jpg',
        image_3: 'yoga-3.jpg',
        image_4: 'yoga-4.jpg',
        user_id: 13,
        subskill_id: 30
      },
      {
        title: 'Вокал',
        description:
          'Ставлю голос и учу петь без стеснения. Дыхание, распевки, любимые песни.',
        image_1: 'vocal-1.jpg',
        image_2: 'vocal-2.jpg',
        image_3: 'vocal-3.jpg',
        image_4: 'vocal-4.jpg',
        user_id: 14,
        subskill_id: 12
      },
      {
        title: 'Монтаж видео',
        description:
          'Учу монтировать в Premiere Pro и DaVinci. От новичка до первого проекта.',
        image_1: 'video-1.jpg',
        image_2: 'video-2.jpg',
        image_3: 'video-3.jpg',
        image_4: 'video-4.jpg',
        user_id: 15,
        subskill_id: 11
      },
      {
        title: 'Немецкий язык',
        description: 'Немецкий для работы и жизни в Германии. Уровни A1–B2.',
        image_1: 'german-1.jpg',
        image_2: 'german-2.jpg',
        image_3: 'german-3.jpg',
        image_4: 'german-4.jpg',
        user_id: 16,
        subskill_id: 26
      },
      {
        title: 'Веб-дизайн',
        description:
          'Учу проектировать сайты и интерфейсы. Figma, UX-основы, портфолио.',
        image_1: 'webdesign-1.jpg',
        image_2: 'webdesign-2.jpg',
        image_3: 'webdesign-3.jpg',
        image_4: 'webdesign-4.jpg',
        user_id: 17,
        subskill_id: 16
      },
      {
        title: 'Плавание',
        description:
          'Учу плавать взрослых с нуля. Кроль, брасс, дыхание, страхи воды.',
        image_1: 'swimming-1.jpg',
        image_2: 'swimming-2.jpg',
        image_3: 'swimming-3.jpg',
        image_4: 'swimming-4.jpg',
        user_id: 18,
        subskill_id: 34
      },
      {
        title: 'Маркетинг',
        description:
          'Маркетинг с нуля до первых клиентов. Стратегия, каналы, аналитика.',
        image_1: 'marketing-1.jpg',
        image_2: 'marketing-2.jpg',
        image_3: 'marketing-3.jpg',
        image_4: 'marketing-4.jpg',
        user_id: 19,
        subskill_id: 2
      },
      {
        title: 'Каллиграфия',
        description:
          'Учу писать красиво. Основы, инструменты, ежедневная практика.',
        image_1: 'calligraphy-1.jpg',
        image_2: 'calligraphy-2.jpg',
        image_3: 'calligraphy-3.jpg',
        image_4: 'calligraphy-4.jpg',
        user_id: 20,
        subskill_id: 16
      }
    ]
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
