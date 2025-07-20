import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Konfigurasi NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ganti logic ini sesuai backend kamu (bisa fetch API, cek DB, dsb)
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Admin Ganteng",
            email: "admin@example.com",
          };
        }

        // Gagal login
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // custom halaman login
  },
  session: {
    strategy: "jwt", // karena pakai credentials (tidak ada cookies dari provider)
  },
  callbacks: {
    async jwt({ token, user }) {
      // ketika berhasil login
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // lempar user.id ke session
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

// export sebagai route handler App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
