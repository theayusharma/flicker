// @ts-nocheck
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Send user data to your Go backend for registration/login
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            googleId: user.id,
            image: user.image,
          }),
        });

        if (response.ok) {
          const userData = await response.json();
          // Store additional user data in the session
          user.backendId = userData.id;
          user.role = userData.role;
          user.token = userData.token;
          
          // Store token in localStorage for API calls
          if (typeof window !== 'undefined') {
            localStorage.setItem('userToken', userData.token);
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // Persist user data to token
      if (user) {
        token.backendId = user.backendId;
        token.role = user.role;
        token.userToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user.backendId = token.backendId;
      session.user.role = token.role;
      session.user.userToken = token.userToken;
      
      // Ensure token is available in localStorage
      if (typeof window !== 'undefined' && token.userToken) {
        localStorage.setItem('userToken', token.userToken);
      }
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
