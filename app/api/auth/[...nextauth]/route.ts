import NextAuth, {
  User as NextAuthUser,
  Session as NextAuthSession,
  NextAuthOptions,
  Account,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb"; // Assuming you have a MongoDB connection utility
import { User } from "@/lib/types/user"; // Importing the existing User type

// Extend the Session and JWT to include user id
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

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      const client = await clientPromise;
      const db = client.db("taskastra"); // Use your actual database name
      const usersCollection = db.collection<User>("users");

      if (!user.email || !user.name) {
        throw new Error("User email or name is not available");
      }

      // Check if user exists
      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        // Insert new user if not found
        await usersCollection.insertOne({
          _id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Update the existing user with new login timestamp
        await usersCollection.updateOne(
          { email: user.email },
          { $set: { updatedAt: new Date().toISOString() } }
        );
      }

      return true; // Allow sign-in
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
        session.user.id = user._id.toString(); // Attach the MongoDB user ID to the session
      }

      return session;
    },
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.id = account.providerAccountId; // Store provider account ID in the token
      }
      return token;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};

// Named exports for HTTP methods
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
