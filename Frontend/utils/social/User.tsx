import {
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

const getUserID = (): string => "" + AUTH.currentUser?.uid;

const getUserRef = (): DocumentReference<DocumentData, DocumentData> =>
  doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid);

const getUserDocSnap = async () => await getDoc(getUserRef());

export { getUserID, getUserRef, getUserDocSnap };
