// FILE: config/envs.ts
// _______________________________________________

import 'dotenv/config';
import joi from 'joi';
// _______________________________________________

type EnvTypes = {
  PORT: number
  DATABASE_URL: string
}
// _______________________________________________

// Validate against the schema
const envSchema = joi.object({
  // The port the server will run on
  PORT: joi.number().required(),
  // The URL of the database
  DATABASE_URL: joi.string().required(),
}).unknown(true); // Allow unknown keys
// _______________________________________________

// Validate the environment variables
const { error, value: validatedEnv } = envSchema.validate(process.env);
// Make sure the port is a number
const envVars: EnvTypes = validatedEnv;

if (error)
  throw new Error(`Config validation error: ${ error.message }`);
// _______________________________________________

// Export the validated environment variables
export const envs = {
  port: envVars.PORT,
  databaseURL: envVars.DATABASE_URL,
};
// _______________________________________________













