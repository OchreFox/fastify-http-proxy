import fastify from "fastify";
import { buildJsonSchemas, register } from "fastify-zod";
import models from "./model/models.js";

const server = fastify();

// Register Swagger and Swagger UI with Zod
await register(server, {
  jsonSchemas: buildJsonSchemas(models),
  swaggerOptions: {
    mode: "dynamic",
    swagger: {
      info: {
        title: "Fastify Mock API",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
    },
  },
  swaggerUiOptions: {
    routePrefix: "/docs",
  },
});

// Routers
server.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

server.zod.get(
  "/ping",
  {
    operationId: "ping",
    reply: `Ping`,
  },
  async (request, reply) => {
    reply.send({ status: "ping!" });
  }
);

server.zod.get(
  "/users",
  {
    operationId: "users",
    reply: `Users`,
  },
  async (request, reply) => {
    reply.send({
      users: [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ],
    });
  }
);

server
  .listen({ port: 1337 })
  .then((address) => {
    server.swagger();
    console.log(`Server listening on ${address}`);
  })
  .catch((err) => {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  });
