import { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { redis } from './db';
import GoogleProvider from 'next-auth/providers/google';
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
  adapter: UpstashRedisAdapter(redis),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = ((await redis.get(`user:${token.id}`)) as User) || null;
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
