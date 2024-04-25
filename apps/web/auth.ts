import Credentials from "next-auth/providers/credentials"
import NextAuth, { NextAuthConfig } from "next-auth"

export const options: NextAuthConfig  = {
    debug: true,
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" }
            },
            
            authorize: async (credentials, request) => {
                let user = null;
                let token = null;
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json, text/plain, */*");
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                myHeaders.append("X-Requested-With", "XMLHttpRequest");
                myHeaders.append("Cookie", ".AspNetCore.Culture=c%3Den%7Cuic%3Den; XSRF-TOKEN=CfDJ8OyfMHGfHwNJtH6UZDFgfuTimCE-AnctMN5wtqvo1LX9qUCkz_YELuFDC-WEllMjy71uAE3zeSzCIqztfaySQvvWYu9FYteBgZnCoZongigYh6y-jsDeksGY9TCWvG7mNgRYj4_1mTQi7PbUaEs7NlU");
                console.log(credentials.email, credentials.password)
                const urlencoded = new URLSearchParams();
                urlencoded.append("grant_type", "password");
                urlencoded.append("client_id", "Angular");
                urlencoded.append("username", credentials.email as string);
                urlencoded.append("password", credentials.password as string);
                urlencoded.append("scope", "AccountService phone roles profile address email offline_access");

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: "follow"
                };
                let result;
                try {
                    const response = await fetch("http://192.168.1.38:44322/connect/token", requestOptions);
                    result = await response.json();
                    token = result;
                } catch (error) {
                    console.error(error);
                };
                // return user object with the their profile data
                user = {
                    id: 1,
                    name: "admin",
                    email: "admin",
                };
                return {...user, ...token};
            },
        }),
    ],
    callbacks: {
        async jwt({ user , account, token}) {
            if (account) {
                // Save the access token and refresh token in the JWT on the initial login
                console.log("Account ", account, user)
                return {
                    access_token: user.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + user.expires_in),
                    refresh_token: user.refresh_token,
                }
            } else if (Date.now() < token.expires_at * 1000) {
                // If the access token has not expired yet, return it
                return token
            } else {
                // If the access token has expired, try to refresh it
                try {
                    // https://accounts.google.com/.well-known/openid-configuration
                    // We need the `token_endpoint`.
                    console.log("Fetch refresh token", token.refresh_token, token);
                    const response = await fetch("http://192.168.1.38:44322/connect/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: "Angular",
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token,
                        }),
                        method: "POST",
                    })

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    return {
                        ...token, // Keep the previous token properties
                        access_token: tokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    // The error property will be used client-side to handle the refresh token error
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        async session({ session, token , user, trigger}) {
            console.log("session called", session, token, user, trigger)
            session.error = token.error
            return {...session, accessToken: token.access_token}
        },
    },
};

export const { auth, handlers, signIn, signOut } = NextAuth(options);

declare module "next-auth" {
    interface Session {
        error?: "RefreshAccessTokenError"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
    }
}