"use strict";

import fastifyCaching from "fastify-lcache";
import fp from "fastify-plugin";

/**
 * This plugin adds https://github.com/denbon05/fastify-lcache
 *
 * @see https://github.com/denbon05/fastify-lcache
 */
module.exports = fp(async function (fastify) {
  fastify.register(fastifyCaching, { ttlInMinutes: 1 });
});

declare module "fastify" {
  export interface FastifyInstance {
    lcache: ILcacheStorage;
  }
}

export interface CachedResponse<T> {
  payload: T;
  headers?: { [key: string]: string | number | string[] };
  statusCode?: number;
}

export interface ILcacheStorage {
  // Get cached data
  get<T>(key: string): CachedResponse<T>;

  // Set data to cache
  set<T>(key: string, value: CachedResponse<T>): void;

  // Check if data exists in cache
  has(key: string): boolean;

  // Clear all data in cache if key not specified
  reset(key?: string): void;

  // Clear Interval which check data lifetime
  destroy(): void;
}
