"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, session = null }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
