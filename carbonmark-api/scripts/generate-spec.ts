import Fastify from "fastify";
import fs from "fs";
import fetch from "node-fetch";
import app from "../src/app";

const fastify = Fastify();

/** This script starts the server and requests the open-api spec via a node-fetch call */
(async function () {
  try {
    await fastify.register(app);
    await fastify.listen({ port: 3000 });
    await fastify.ready();
    const resp = await fetch("http://localhost:3000/documentation/json");
    const specification = await resp.json();
    fs.writeFileSync("./openapi.json", JSON.stringify(specification, null, 2));
    fastify.close();
  } catch (err) {
    console.error(err);
    fastify.close();
  }
})();
