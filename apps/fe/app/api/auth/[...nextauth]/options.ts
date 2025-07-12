import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";


export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {  label: "Email", type: "text", placeholder: "jsmith"},
        password: { label: "Password", type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'http://localhost:3000/signin',
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const { dbuser, accessToken, expiresIn } = response.data;

          if (!dbuser || !accessToken || !expiresIn) return null;

          return {
            id: dbuser.id,
            name: dbuser.name,
            email: dbuser.email,
            expiresIn,
            accessToken, 
          };
        } catch (e) {
          console.error('Login error:', e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {

    async signIn({user, account, profile}){
      if (account?.provider === 'google'){
          const res = await axios.post('http://localhost:3001/google-signin',
            {
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: profile!.sub,
            },
            {
              withCredentials: true
            }
        );

        const data = res.data

        user.accessToken = data.accessToken;
        user.expiresIn = data.expiresIn;

        return true;
      } 
      return true; 
    },

    async jwt({ token, user}) {

      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = Date.now() + user.expiresIn * 1000

        return token;
      }

      if (Date.now() < token.accessTokenExpires) {
      return token;
    }

      try {
        const res = await axios.post(
          "http://localhost:3000/refresh",
          {},
          { withCredentials: true }
        );

        token.accessToken = res.data.accessToken;
        token.accessTokenExpires = Date.now() + res.data.expiresIn * 1000;
      } catch (err) {
        console.error("Refresh token failed", err);
      }

     return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id
      return session;
    }

  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET
};
