import {
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

/**
 * Gets the user ID of the current user
 *
 * @returns - The user ID of the current user
 */
const getUserId = (): string => "" + AUTH.currentUser?.uid;

/**
 * Gets the document reference of the current user
 *
 * @returns - The document reference of the current user
 */
const getUserRef = (): DocumentReference<DocumentData, DocumentData> =>
  doc(DATA_BASE, "Users", getUserId());

/**
 * Gets the document snapshot of the current user
 *
 * @returns - The document snapshot of the current user
 */
const getUserDocSnap = async (): Promise<
  DocumentSnapshot<DocumentData, DocumentData>
> => await getDoc(getUserRef());

export { getUserId, getUserRef, getUserDocSnap };
