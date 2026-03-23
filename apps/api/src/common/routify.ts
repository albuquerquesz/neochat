import type { FastifyInstance } from "fastify";

export const routify = async (app: FastifyInstance) => {
  const glob = new Bun.Glob("src/modules/**/index.ts").scan({
    absolute: true
  });

  for await (const path of glob) {
    const { route } = await import(path);

    if (typeof route !== "function") {
      console.log(`${route} is not a function. Skipping...`);
      return;
    }

    route(app)
  }
}
