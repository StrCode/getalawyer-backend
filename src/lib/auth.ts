import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/db';
import { emailOTP, openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
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
      secure: true,
      httpOnly: true,
    },
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
  plugins: [openAPI(),
  emailOTP({
    allowedAttempts: 5, // Allow 5 attempts before invalidating the OTP
    expiresIn: 300,
    async sendVerificationOTP({ email, otp, type }) {
      if (type === "sign-in") {
        // Send the OTP for sign in
      } else if (type === "email-verification") {
        // Send the OTP for email verification
      } else {
        // Send the OTP for password reset
      }
    },
  })
  ],
});
