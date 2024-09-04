import { GetApiAccountMyProfileResponse } from "@ayasofyazilim/saas/AccountService";
import {
  getMyProfile,
  obtainAccessTokenByRefreshToken,
  signInWithCredentials,
} from "auth-action";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export type Awaitable<T> = T | PromiseLike<T> ;


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          const response = await signInWithCredentials(credentials as {
            username: string;
            password: string;
          });
          if ("error" in response) {
            const error = response?.error + ": " + response?.error_description;
            return Promise.reject(new AuthError(error));
          }
          if (response?.access_token) {
            return { ...response };
          }
          return Promise.reject(new AuthError("Unknown Error: No token provided"));
        } catch (error) {
          return Promise.reject(new Error("Unknown Error " + error));
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (token.error){
        session.error = token.error as string || "RefreshAccessTokenError";
        return session;
      }
      const typedToken = token as unknown as Token;
      const userData = await getMyProfile(typedToken.access_token);
      session.user = userData;
      session.access_token = typedToken.access_token;
      return session;
    },
    async jwt({ token, user }) {
      const typedToken = token as unknown as Token;
      if (user) {
        return {
          ...token,
          access_token: user.access_token,
          expires_at: Math.floor(Date.now() / 1000) + (user.expires_in || 0),
          refresh_token: user.refresh_token,
        };
      } else if (Date.now() < (typedToken.expires_at || 0) * 1000) {
        return token;
      }
      if (!token.refresh_token) {
        throw new Error("No refresh token");
      }
      const tokens = await obtainAccessTokenByRefreshToken(typedToken.refresh_token);
      if ("error" in tokens) {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        }
      }
      return {
        ...token,
        access_token: tokens.access_token,
        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
        refresh_token: tokens.refresh_token ?? token.refresh_token,
      };
    },
  },
});

export interface Token {
  id?: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type?: string;
  id_token?: string;
  expires_at?: number;
}

declare module "next-auth" {
  interface User extends Token {
    userName: string;
  }
}

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError" | string;
    access_token?: string;
    user?: GetApiAccountMyProfileResponse | any; 
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
