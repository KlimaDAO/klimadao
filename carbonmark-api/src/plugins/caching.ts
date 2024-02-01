import fastifyCaching from "fastify-lcache";
import fp from "fastify-plugin";

/**
 * This plugin adds https://github.com/denbon05/fastify-lcache
 *
 * @see https://github.com/denbon05/fastify-lcache
 */
export default fp(async function (fastify) {
  //We need to disable caching in testing to allow proper mocking
  if (process.env.NODE_ENV !== "test") {
    await fastify.register(fastifyCaching, { ttlInMinutes: 1 });
  }
});

export type CachedResponse<T> =
  | {
      payload: T;
      headers?: { [key: string]: string | number | string[] };
      statusCode?: number;
    }
  | undefined;

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
