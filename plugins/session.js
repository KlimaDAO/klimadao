'use strict'

const fp = require('fastify-plugin')
// const fastifySession = require('@fastify/session');
// const fastifyCookie = ;
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const SESSION_SECRET = 'env_key';
const SESSION_TTL = 864e3; // 1 day in seconds

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-cookie'));
    fastify.register(require('@mgcrea/fastify-session'), 
        {
        secret: SESSION_SECRET,
        cookie: { maxAge: SESSION_TTL },
      }
    
    );
   
})
