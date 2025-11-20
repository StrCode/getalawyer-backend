import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/db';
import { openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  //TODO:remove if not fixed
  baseURL: "https://getalawyer-backend-production.up.railway.app",
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "https://getalawyer-frontend.vercel.app"
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true, // Must be true if sameSite is none
      httpOnly: true
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [openAPI()],
});
