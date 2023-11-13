import fastify from "fastify";
import proxy from "@fastify/http-proxy";
import cors from "@fastify/cors";
import { getConfig } from "./env.js";

// Configuration
const envConfig = getConfig();
const port: number = Number(process.env.PORT) || 8080;
const host = process.env.HOST ?? "0.0.0.0";
const proxyTargetUrl = envConfig.PROXY_TARGET_URL ?? "http://localhost:3000";
const env = process.env.NODE_ENV ?? "development";
const allowedOrigins: string[] = envConfig.ALLOWED_ORIGINS.split(",") ?? [];

async function createServer({ upstream }: { upstream: string }) {
  const server = fastify({
    logger: {
      level: "info",
    },
  });

  // CORS
  await server.register(cors, {
    origin: allowedOrigins,
    credentials: true,
    hook: "preHandler",
  });

  // Register the proxy plugin
  await server.register(proxy, {
    upstream,
    // Not setting OPTIONS as it is handled by cors plugin
    httpMethods: ["GET", "POST", "PUT", "DELETE"],
  });

  return server;
}

const server = await createServer({ upstream: proxyTargetUrl });

server.get("/ping", async (request, reply) => {
  return { status: "ping!" };
});

// Start the server
const start = async () => {
  try {
    server.listen({ port: port, host: host }, () => {
      const address = server.server.address();
      // if address is typeof AddressInfo, then it is a TCP address
      if (address && typeof address !== "string") {
        console.log(
          `Proxy server listening on ${address.address}:${address.port} in ${env} mode`
        );
      }
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
