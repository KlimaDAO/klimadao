import { FirebaseInstance } from "src/plugins/firebase";

export const getFirebaseUser = async (id: string, fb: FirebaseInstance) =>
  await fb.firestore().collection("users").doc(id).get();
