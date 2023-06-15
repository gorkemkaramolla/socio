import { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { redis } from './db';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
const prisma = new PrismaClient();

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_SECRET_ID;
  if (!clientId) {
    throw new Error('Missing Google ClientId');
  }
  if (!clientSecret) {
    throw new Error('Missing Google ClientId');
  }
  return { clientId, clientSecret };
};
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials, req) {
        prisma.$connect();

        const result = await prisma.user.findFirst({
          where: { email: credentials?.email! },
        });
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }
        const checkPassword = await compare(
          credentials?.password!,
          result?.password!
        );
        // incorrect password
        if (!checkPassword || result?.email !== credentials?.email!) {
          throw new Error("Username or Password doesn't match");
        }
        prisma.$disconnect();
        if (checkPassword) {
          return {
            id: String(result.id),
            email: result.email,
            name: result.name,
          };
        } else return null;
      },
      credentials: { email: { type: 'text' }, password: { type: 'text' } },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      prisma.$connect();
      let newUser = await prisma.user.findUnique({
        where: { email: token?.email! },
      });
      if (!newUser) {
        newUser = await prisma.user.create({
          data: {
            email: token?.email!,
            name: token?.name,
            imageUri: token?.picture!,
          },
        });
      }
      prisma.$disconnect();
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.imageUri,
      } as JWT;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.picture!;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return baseUrl;
    },
  },
};
