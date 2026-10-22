import { prisma } from '../../prisma/prisma.ts';

class ExchangeService {
  async sendExchange(initiator_id: number, receiver_id: number) {
    if (initiator_id === receiver_id) {
      throw new Error('Нельзя отправить запрос самому себе');
    }

    const [initiator, receiver] = await Promise.all([
      prisma.user.findUnique({
        where: { id: initiator_id },
        select: { id: true }
      }),
      prisma.user.findUnique({
        where: { id: receiver_id },
        select: { id: true }
      })
    ]);

    if (!initiator) throw new Error('Пользователь не найден');
    if (!receiver) throw new Error('Пользователь не найден');

    await prisma.exchange.create({
      data: {
        initiator_id,
        receiver_id,
        status: 'PENDING'
      }
    });

    const initiator_exchanges = await prisma.exchange.findMany({
      where: { initiator_id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        initiator: {
          select: { id: true, name: true }
        },
        receiver: {
          select: { id: true, name: true }
        }
      }
    });

    const receiver_exchanges = await prisma.exchange.findMany({
      where: { receiver_id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        initiator: {
          select: { id: true, name: true }
        },
        receiver: {
          select: { id: true, name: true }
        }
      }
    });

    return {
      data: {
        initiator_exchanges,
        receiver_exchanges
      }
    };
  }

  async fetchExchanges(user_id: number) {
    const initiator_exchanges = await prisma.exchange.findMany({
      where: { initiator_id: user_id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        initiator: {
          select: { id: true, name: true }
        },
        receiver: {
          select: { id: true, name: true }
        }
      }
    });

    const receiver_exchanges = await prisma.exchange.findMany({
      where: { receiver_id: user_id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        initiator: {
          select: { id: true, name: true }
        },
        receiver: {
          select: { id: true, name: true }
        }
      }
    });

    return {
      data: {
        initiator_exchanges,
        receiver_exchanges
      }
    };
  }
}

export const exchangeService = new ExchangeService();
