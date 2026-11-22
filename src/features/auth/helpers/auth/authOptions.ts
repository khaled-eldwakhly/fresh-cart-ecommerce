import { signinAction } from "@/features/auth/server/auth.actions";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

interface decodedTokenType {
  id: string;
  name: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    async encode({ token, secret, maxAge }) {
      const age = token?.rememberMe ? maxAge : 60 * 60 * 24;
      return encode({ token, secret, maxAge: age });
    },
  },

  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {}, rememberMe: {} },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const data = await signinAction({
          email: credentials.email,
          password: credentials.password,
        });

        if (data.message === "success") {
          const decodedToken: decodedTokenType = jwtDecode(data.token);
          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
            rememberMe: credentials.rememberMe === "true",
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user.user;
        token.token = user.token;
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user = token.user;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
