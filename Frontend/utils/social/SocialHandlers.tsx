import { Dispatch, SetStateAction } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentReference,
  DocumentData,
  CollectionReference,
  collection,
  Timestamp,
} from "firebase/firestore";
import { DATA_BASE } from "@/firebaseCONFIG";
import { getUserId, getUserDocSnap, getUserRef } from "./User";

/**
 * Adds or removes the user's id from the items likes array
 *
 * @param setHeart - The react state function that sets the heart symbol state
 * @param setLikes - The react state function that sets the number of likes state
 * @param itemRef - The document reference of the item to change the likes
 */
const likeHandler = async (
  setHeart: Dispatch<SetStateAction<boolean>>,
  setLikes: Dispatch<SetStateAction<number>>,
  itemRef: DocumentReference<DocumentData, DocumentData>
): Promise<void> => {
  setHeart((prev) => !prev);

  const currentDoc = (await getDoc(itemRef)).data();
  if (currentDoc?.likes.includes(getUserId())) {
    setLikes(currentDoc?.likes.length - 1);
    updateDoc(itemRef, {
      likes: arrayRemove(getUserId()),
    });
  } else {
    setLikes(currentDoc?.likes.length + 1);
    updateDoc(itemRef, {
      likes: arrayUnion(getUserId()),
    });
  }
};

/**
 * Adds or remove the item from the user's collection
 *
 * @param setSaved - The react state function that sets the saved symbol state
 * @param itemRef - The document reference of the item to add to the user's collection
 * @param field - The name of the collection that the item is suppose to belong to
 */
const saveHandler = async (
  setSaved: Dispatch<SetStateAction<boolean>>,
  itemRef: DocumentReference,
  field: string
): Promise<void> => {
  setSaved((prev) => !prev);

  const userData = (await getUserDocSnap()).data();
  if (userData && userData[field]) {
    const refArray: DocumentReference[] = userData[field];
    if (
      refArray.some(
        (ref: DocumentReference<DocumentData, DocumentData>) =>
          ref.path === itemRef.path
      )
    ) {
      updateDoc(getUserRef(), {
        [field]: arrayRemove(itemRef),
      });
    } else {
      updateDoc(getUserRef(), {
        [field]: arrayUnion(itemRef),
      });
    }
  }
};

/**
 * Create a comment document
 *
 * @param body - The content of the comment
 * @param collectionName - The collection name to store the created comment document in
 * @returns - The document reference of the created comment
 */
const commentCreate = (
  body: string,
  collectionName: string
): DocumentReference<DocumentData, DocumentData> => {
  const CommentsRef: CollectionReference<DocumentData, DocumentData> =
    collection(DATA_BASE, collectionName);
  const commentRef = doc(CommentsRef);
  setDoc(commentRef, {
    body: body,
    time: Timestamp.now(),
    user: getUserRef(),
  });
  return commentRef;
};

/**
 * Stores a created comment document inside the item's comments array
 *
 * @param body - The content of the comment
 * @param ref - The document reference of the item
 * @param collectionName - The collection name to store the created comment document in
 */
const commentHandler = async (
  body: string,
  ref: DocumentReference,
  collectionName: string
): Promise<void> => {
  const commentRef = commentCreate(body, collectionName);
  await updateDoc(ref, {
    comments: arrayUnion(commentRef),
  });
};

export { likeHandler, commentHandler, saveHandler };
