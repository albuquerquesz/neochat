import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./common/env";
import { routify } from "./common/routify";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler);

await routify(app);

app.listen({ port: env.PORT }, (err, host) => {
  if (err) return err;
  const raw = host.split(":")
  const port = raw[raw.length - 1]

  console.log(`neochat API running on :${port}`);
});
