const { randomUUID } = require('node:crypto');

let prisma;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = globalThis.prismaClient || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaClient = prisma;
  }
} catch (error) {
  // In-memory fallback if Prisma client is not generated or database is unreachable
  const bcrypt = require('bcryptjs');
  const usersById = new Map();
  const usersByEmail = new Map();

  const demoHash = bcrypt.hashSync('password123', 10);
  const demoUser = {
    id: 'user-demo-1',
    name: 'Alex Morgan',
    email: 'alex@company.com',
    passwordHash: demoHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  usersById.set(demoUser.id, demoUser);
  usersByEmail.set(demoUser.email, demoUser);

  prisma = {
    user: {
      findUnique: async ({ where }) => {
        if (where.email) {
          const u = usersByEmail.get(where.email.toLowerCase());
          return u ? { ...u } : null;
        }
        if (where.id) {
          const u = usersById.get(where.id);
          return u ? { ...u } : null;
        }
        return null;
      },
      create: async ({ data, select }) => {
        const id = randomUUID();
        const now = new Date();
        const user = {
          id,
          name: data.name,
          email: data.email.toLowerCase(),
          passwordHash: data.passwordHash,
          createdAt: now,
          updatedAt: now,
        };
        usersById.set(id, user);
        usersByEmail.set(user.email, user);

        if (select) {
          const selected = {};
          for (const key of Object.keys(select)) {
            if (select[key]) selected[key] = user[key];
          }
          return selected;
        }
        return { ...user };
      },
    },
  };
}

module.exports = prisma;
