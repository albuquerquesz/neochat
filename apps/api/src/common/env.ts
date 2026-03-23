import z from "zod";

const PORT_SCHEMA = z.number().refine(value => {
  if (Number.isNaN(value) || value > 65355) throw new Error("Invalid port");

  return value;
})

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: PORT_SCHEMA,

  DATABASE_URL: z.url(),

  REDIS_HOST: z.url(),
  REDIS_PORT: PORT_SCHEMA
});

export const env = schema.parse(process.env);
