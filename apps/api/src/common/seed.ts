import { faker } from "@faker-js/faker";
import { db } from "./prisma";

const USER_COUNT = 6;
const CHAT_COUNT = 4;
const SESSION_COUNT_RANGE = { min: 1, max: 3 };
const MESSAGE_COUNT_RANGE = { min: 3, max: 8 };

async function seed() {
  await db.$transaction([
    db.messages.deleteMany({}),
    db.session.deleteMany({}),
    db.chat.deleteMany({}),
    db.user.deleteMany({}),
  ]);

  const users = await Promise.all(
    Array.from({ length: USER_COUNT }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return db.user.create({
        data: {
          id: faker.string.uuid(),
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        },
      });
    }),
  );

  for (const user of users) {
    const sessionCount = faker.number.int(SESSION_COUNT_RANGE);

    await Promise.all(
      Array.from({ length: sessionCount }, () =>
        db.session.create({
          data: {
            id: faker.string.uuid(),
            userId: user.id,
            hash: faker.string.alphanumeric(64),
            ip: faker.internet.ip(),
          },
        }),
      ),
    );
  }

  for (let index = 0; index < CHAT_COUNT; index += 1) {
    const chat = await db.chat.create({
      data: {
        id: faker.string.uuid(),
      },
    });

    const messageCount = faker.number.int(MESSAGE_COUNT_RANGE);

    await Promise.all(
      Array.from({ length: messageCount }, () => {
        const sender = faker.helpers.arrayElement(users) as (typeof users)[number];

        return db.messages.create({
          data: {
            id: faker.string.uuid(),
            chatId: chat.id,
            senderId: sender.id,
            content: faker.lorem.sentence(),
          },
        });
      }),
    );
  }

  const [userCount, sessionCount, chatCount, messageCount] = await Promise.all([
    db.user.count(),
    db.session.count(),
    db.chat.count(),
    db.messages.count(),
  ]);

  console.log(
    `Seeded ${userCount} users, ${sessionCount} sessions, ${chatCount} chats, and ${messageCount} messages.`,
  );
}

seed()
  .catch((error) => {
    console.error("Seeding failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
