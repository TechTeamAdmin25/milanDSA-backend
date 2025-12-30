import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  SERVICE_NAME: process.env.SERVICE_NAME || "ticketing-backend",

  // Auth0
  AUTH0: {
    AUDIENCE: process.env.AUTH0_AUDIENCE!,
    ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL!,
    TOKEN_ALG: process.env.AUTH0_TOKEN_ALG || "RS256",
  },

  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY!,
} as const;
