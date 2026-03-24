import { db } from "../../common/prisma";
import { Prisma } from "../../generated/prisma/client";

const SESSION_COUNT = 5;
export class SessionService {
  async create({ userId }: Prisma.SessionCreateInput) {
    if (count(userId) >= SESSION_COUNT) return { ok: false, data: null };

    return db.session.create({ data });
  }

  async list(userId: string, limit = 5) {
    return db.session.findMany({
      where: {
        userId,
      },
      take: limit,
    });
  }

  async update(args: Prisma.SessionUpdateArgs) {
    return db.session.update(args);
  }

  async delete(id?: string) {
    if (!id) {
      return db.session.deleteMany({});
    }

    return db.session.delete({ where: { id } });
  }

  async deleteMany(args?: Prisma.SessionDeleteManyArgs) {
    return db.session.deleteMany(args);
  }

  async count(userId: string) {
    return db.session.count({ where: { userId } });
  }
}

export const sessionService = new SessionService();
