// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({});

// globalForPrisma.prisma = prisma;
import { PrismaClient } from '@prisma/client';
import 'server-only';

declare global {
  var cachedPrisma: PrismaClient;
}

let prismax: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prismax = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prismax = global.cachedPrisma;
}

export const prisma = prismax;
