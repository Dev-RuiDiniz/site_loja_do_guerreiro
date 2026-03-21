type PrismaLike = Record<string, any>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaLike | undefined;
};

function createPrismaFallback(): PrismaLike {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          "Prisma client indisponível neste workspace. O frontend público da Loja do Guerreiro não depende desse recurso."
        );
      },
    }
  );
}

export const prisma = globalForPrisma.prisma ?? createPrismaFallback();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
