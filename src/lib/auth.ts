import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db("skillforge");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "learner",
        input: true,
      },

      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },
  plugins: [jwt()],
});