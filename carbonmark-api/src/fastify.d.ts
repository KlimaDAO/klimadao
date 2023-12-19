import "fastify";
import { FirestoreUserDoc } from "./models/FirestoreUserDoc.model";
import { ILcacheStorage } from "./plugins/caching";

declare module "fastify" {
  interface FastifyRequest {
    /** Authenticated routes may pass the userDoc down from preHandler */
    userDoc?: FirestoreUserDoc | null;
  }
  interface FastifyInstance {
    lcache: ILcacheStorage;
  }
  interface FastifyInstance {
    firebase: FirebaseInstance;
  }
}
