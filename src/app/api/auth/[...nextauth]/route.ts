import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

type CustomUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  remember?: boolean;
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          ...user,
          remember: credentials.remember === "true",
        } as CustomUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.remember = (user as CustomUser).remember ?? false;
        token.exp =
          Math.floor(Date.now() / 1000) +
          ((user as CustomUser).remember ? 60 * 60 * 24 * 30 : 60 * 60);
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        remember: token.remember,
      } as CustomUser;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
