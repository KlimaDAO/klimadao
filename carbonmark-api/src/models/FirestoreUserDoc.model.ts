import { Static, Type } from "@sinclair/typebox";

/**
 * Should not be documented in public docs.
 * At time of writing we only use this for types, we don't validate firestore writes against this schema.
 *
 * Updated 09.12.2023 - added nonce
 */
export const FirestoreUserDocModel = Type.Object({
  /** Unique, immutable, case-insensitive handle */
  handle: Type.String({ minLength: 3, maxLength: 24 }),
  /** Unix timestamp ms */
  createdAt: Type.Number(),
  /** Unix timestamp ms */
  updatedAt: Type.Number(),
  /** Lower case wallet address which owns the profile */
  address: Type.String(),
  /** Editable username */
  username: Type.String({ minLength: 2 }),
  /** Optional profile description. May also be empty string. */
  description: Type.Optional(Type.String()),
  /** Optional image url. May also be empty string. */
  profileImgUrl: Type.Optional(Type.String()),
  /**
   * Nonce, incremented once per edit, may not be present
   * Ensures the same message hash can never be reused (replay attack)
   * */
  nonce: Type.Optional(Type.Number()),
});

export type FirestoreUserDoc = Static<typeof FirestoreUserDocModel>;
