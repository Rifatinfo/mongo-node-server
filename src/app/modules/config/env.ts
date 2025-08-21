import dotenv from 'dotenv';
dotenv.config();


interface EnvConfig {
  PORT: string,
  DB_URL: string,
  NODE_ENV: string,
  JWT_ACCESS_SECRET: string,
  JWT_ACCESS_EXPIRES: string,
  BCRYPT_SALT_ROUND: string,
  SUPER_ADMIN_EMAIL: string,
  SUPER_ADMIN_PASSWORD: string,
  JWT_REFRESH_SECRET: string,
  JWT_REFRESH_EXPIRES: string,
  GOOGLE_CLIENTS_SECRET: string,
  GOOGLE_CLIENTS_ID: string,
  GOOGLE_CALLBACK_URL: string,
  FRONTEND_URL: string
  REDIS_HOST: string,
  REDIS_PORT: string,
  REDIS_USERNAME: string,
  REDIS_PASSWORD: string,
  SMTP_PASS: string,
  SMTP_HOST: string,
  SMTP_PORT: string,
  SMTP_USER: string,
  SMTP_FROM: string,
  CLOUDINARY_CLOUD_NAME: string,
  CLOUDINARY_API_KEY: string,
  CLOUDINARY_API_SECRET: string
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  requiredEnvVariable.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  })

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    JWT_ACCESS_SECRET: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    GOOGLE_CLIENTS_SECRET: process.env.GOOGLE_CLIENTS_SECRET as string,
    GOOGLE_CLIENTS_ID: process.env.GOOGLE_CLIENTS_ID as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: process.env.REDIS_PORT as string,
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    SMTP_PASS: process.env.SMTP_PASS as string,
    SMTP_HOST: process.env.SMTP_HOST as string,
    SMTP_PORT: process.env.SMTP_PORT as string,
    SMTP_USER: process.env.SMTP_USER as string,
    SMTP_FROM: process.env.SMTP_FROM as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string
  }
}

export const envVars = loadEnvVariable();