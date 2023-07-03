const fp = require("fastify-plugin");
const cors = require("@fastify/cors");

const ALLOWED_ORIGINS = [
  "localhost",
  "carbonmark.com",
  /carbonmark-[a-zA-Z0-9]*-klimadao\.vercel\.app/,
];
/**
 * Checks if a string matches any of the provided patterns.
 *
 * @param {string} string - The string to be checked.
 * @param {Array.<(string|RegExp)>} patterns - The patterns to match against.
 * @returns {boolean} True if the string matches any pattern, false otherwise.
 */
const isMatch = (string, patterns) =>
  patterns.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(string);
    } else {
      return pattern === string;
    }
  });

/**
 * This plugin integrates the CORS middleware into Fastify
 * to handle the CORS preflight requests and add CORS headers to responses.
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify) {
  fastify.register(cors, {
    origin: (origin, cb) => {
      if (origin === undefined) return cb(null, true);

      const hostname = new URL(origin).hostname;
      if (isMatch(hostname, ALLOWED_ORIGINS)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed"), false);
      }
    },
  });
});
