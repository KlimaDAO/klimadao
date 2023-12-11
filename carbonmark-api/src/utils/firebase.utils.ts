export const isFirestoreUserDoc = (doc?: unknown): doc is FirestoreUserDoc => {
  if (!doc || !Object.hasOwn(doc, "createdAt")) return false;
  return true;
};

/**
 * Updated 09.12.2023 - added nonce
 */
export interface FirestoreUserDoc {
  /** Unique, case-insensitive handle */
  handle: string;
  /** Unix timestamp ms */
  createdAt: number;
  /** Unix timestamp ms */
  updatedAt: number;
  /** Lower case wallet address */
  address: string;
  /** Editable username */
  username: string;
  /** Optional profile description */
  description?: string | null;
  /** Optional image url */
  profileImgUrl?: string | null;
  /** Nonce, incremented once per edit, may not be present
   * Ensures the same message hash can never be reused (replay attack) */
  nonce?: number;
}

export const getFirestoreUserDoc = async (params: {
  docId: string;
  firestore: FirebaseFirestore.Firestore;
}): Promise<null | FirestoreUserDoc> => {
  const userDocRef = await params.firestore
    .collection("users")
    .doc(params.docId.toUpperCase())
    .get();
  if (!userDocRef.exists) return null;
  const userDoc = userDocRef.data();
  if (!isFirestoreUserDoc(userDoc)) return null;
  return userDoc;
};
