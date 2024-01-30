import "fastify";
import { UserProfile } from "./models/UserProfile.model";
import { ILcacheStorage } from "./plugins/caching";

declare module "fastify" {
  interface FastifyRequest {
    /** Authenticated routes may pass the userDoc down from preHandler */
    userProfile?: UserProfile | null;
  }
  interface FastifyInstance {
    lcache: ILcacheStorage;
  }
  interface FastifyInstance {
    firebase: FirebaseInstance;
  }
}
