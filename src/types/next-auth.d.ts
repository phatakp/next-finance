import "next-auth";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    username?: string | null;
  }
  interface Session {
    user: User;
  }
}
