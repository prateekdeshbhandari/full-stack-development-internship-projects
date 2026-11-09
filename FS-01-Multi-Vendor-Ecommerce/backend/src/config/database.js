const { PrismaClient } = require('@prisma/client');

const isProduction = process.env.NODE_ENV === 'production';
const prisma =
  (!isProduction && globalThis.prismaClient) ||
  new PrismaClient({
    log: isProduction ? ['error'] : ['warn', 'error'],
  });

if (!isProduction) {
  globalThis.prismaClient = prisma;
}

module.exports = prisma;
