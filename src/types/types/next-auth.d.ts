import "next-auth";
import "next-auth/jwt";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface User {
    user: UserInfo;
    token: string;
    rememberMe?: boolean;
  }

  interface Session {
    user: UserInfo;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user: UserInfo;
    token: string;
    rememberMe?: boolean;
  }
}
