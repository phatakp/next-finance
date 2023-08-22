import { cash } from "@/config/banks";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { password: true },
        });

        if (!user || !user?.password) return null;

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password.hash
        );

        if (!isCorrectPassword) return null;

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async createUser({ user }) {
      await db.bankAcct.create({
        data: {
          number: "XX-Cash",
          bank: cash,
          userId: user.id,
        },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name as string,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export const getAuthServerSession = () => getServerSession(authOptions);
