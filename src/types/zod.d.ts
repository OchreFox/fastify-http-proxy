import type { FastifyZod } from "fastify-zod";
import models from "../model/models.ts";

declare module "fastify" {
  interface FastifyInstance {
    readonly zod: FastifyZod<typeof models>;
  }
}
