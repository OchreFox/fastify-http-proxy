# HTTP Proxy with CORS

## Description

This is a simple HTTP proxy server with CORS enabled. It can be used to proxy requests to any HTTP endpoint. It is built using [Fastify](https://www.fastify.dev/) and bootstrapped with Fastify-CLI.
It also includes a simple mock server to test the proxy.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Compiles the Typescript code into the `build` folder.

### `npm start`

Runs the proxy server on port `8080`.

### `npm run mock-server`

Runs the mock server on port `1337`.
It includes a swagger UI to test the mock server on `http://localhost:1337/docs`.
The Swagger is auto-generated via [Fasitfy Zod](https://github.com/elierotenberg/fastify-zod) using [Zod](https://zod.dev/) schemas.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
