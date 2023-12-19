import { FirestoreUserDoc } from "../models/FirestoreUserDoc.model";

export const isFirestoreUserDoc = (doc?: unknown): doc is FirestoreUserDoc => {
  if (!doc || !Object.hasOwn(doc, "createdAt")) return false;
  return true;
};

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
