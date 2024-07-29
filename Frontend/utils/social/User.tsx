import {
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

const getUserId = (): string => "" + AUTH.currentUser?.uid;

const getUserRef = (): DocumentReference<DocumentData, DocumentData> =>
  doc(DATA_BASE, "Users", getUserId());

const getUserDocSnap = async (): Promise<
  DocumentSnapshot<DocumentData, DocumentData>
> => await getDoc(getUserRef());

export { getUserId, getUserRef, getUserDocSnap };
