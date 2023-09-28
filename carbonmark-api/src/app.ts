import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import * as dotenv from "dotenv";
import { FastifyPluginAsync } from "fastify";
import path, { join } from "path";
import { CommonSchema } from "./models/CommonSchema.model";

// Only pull env vars from .env if running in locally
if (!["preview", "production"].includes(process.env.VERCEL_ENV ?? "")) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });
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
  fastify.addSchema(CommonSchema);
  // This loads all plugins defined in src/plugins
  // those should be support plugins that are reused
  // through your application
  void (await fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  }));

  // This loads all routes defined in src/routes
  // define your routes in one of these

  void (await fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
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
