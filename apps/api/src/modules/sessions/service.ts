import { db } from "../../common/prisma";
import { Prisma } from "../../generated/prisma/client";

export class SessionService {
  async create(data: Prisma.SessionCreateInput) {
    return db.session.create({ data });
  }

  async findMany(args?: Prisma.SessionFindManyArgs) {
    return db.session.findMany(args);
  }

  async findFirst(args: Prisma.SessionFindFirstArgs) {
    return db.session.findFirst(args);
  }

  async findUnique(args: Prisma.SessionFindUniqueArgs) {
    return db.session.findUnique(args);
  }

  async update(args: Prisma.SessionUpdateArgs) {
    return db.session.update(args);
  }

  async delete(args: Prisma.SessionDeleteArgs) {
    return db.session.delete(args);
  }

  async deleteMany(args?: Prisma.SessionDeleteManyArgs) {
    return db.session.deleteMany(args);
  }

  async count(args?: Prisma.SessionCountArgs) {
    return db.session.count(args);
  }
}

export const sessionService = new SessionService();
