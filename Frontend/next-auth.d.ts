import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      googleId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    googleId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
  }
}
