import dotenv from "dotenv";

dotenv.config();

export const EnvironmentVariables = {
  PORT: process.env.PORT as string,
  MONGODB_STRING: process.env.LIVE_URL as string,
  API_KEY: process.env.api_key as string,
  API_SECRET: process.env.api_secret as string,
  Kora_secret_key: process.env.Kora_secret_key as string,
  Encrypted_key: process.env.encrypt as string,
};
