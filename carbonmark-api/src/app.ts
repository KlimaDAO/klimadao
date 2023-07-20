import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import * as dotenv from "dotenv";
import { FastifyPluginAsync } from "fastify";
import { join } from "path";

// This is not pretty but we need to reference the env file at the root of the monorepo
const result = dotenv.config({ path: join(process.cwd(), "../.env") });

if (result.error) {
  console.error("Error loading .env file", result.error);
}

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void (await fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  }));

  // This loads all plugins defined in routes
  // define your routes in one of these

  void (await fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...opts, prefix: "/api" },
    dirNameRoutePrefix: false,
  }));

  void (await fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error); // Log the error
    reply.status(500).send({
      message: "An internal server error occurred",
      error: error.message,
    });
  }));
};

export default app;
export { app, options };
