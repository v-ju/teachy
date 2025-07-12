import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            accessToken:string
        } & DefaultSession["user"]
    }

    interface User {
        id: string;
        name: string;
        email: string;
        accessToken:string;
        expiresIn: number;
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    accessTokenExpires: number;
  }
}

