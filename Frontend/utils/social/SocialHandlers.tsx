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
