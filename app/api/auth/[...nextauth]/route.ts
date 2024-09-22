import NextAuth, {
  User as NextAuthUser,
  Session as NextAuthSession,
  NextAuthOptions,
  Account,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { User } from "@/lib/types/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user }: { user: NextAuthUser }) {
      const client = await clientPromise;
      const db = client.db("taskastra");
      const usersCollection = db.collection<User>("users");

      if (!user.email || !user.name) {
        throw new Error("User email or name is not available");
      }

      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        await usersCollection.insertOne({
          _id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        await usersCollection.updateOne(
          { email: user.email },
          { $set: { updatedAt: new Date().toISOString() } }
        );
      }

      return true;
    },
    async session({ session }: { session: NextAuthSession }) {
      const client = await clientPromise;
      const db = client.db("taskastra");
      const usersCollection = db.collection<User>("users");

      if (!session.user.email) {
        throw new Error("User email is not available");
      }

      const user = await usersCollection.findOne({
        email: session.user.email,
      });

      if (user) {
        session.user.id = user._id.toString();
      }

      return session;
    },
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.id = account.providerAccountId;
      }
      return token;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
