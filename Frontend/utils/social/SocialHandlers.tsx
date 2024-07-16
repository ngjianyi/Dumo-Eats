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

const recipeSaveHandler = async (
  setSaved: Dispatch<SetStateAction<boolean>>,
  recipeId: string
): Promise<void> => {
  setSaved((prev) => !prev);

  const userData = (await getUserDocSnap()).data();
  if (userData?.savedRecipes.includes(recipeId)) {
    updateDoc(getUserRef(), {
      savedRecipes: arrayRemove(recipeId),
    });
  } else {
    updateDoc(getUserRef(), {
      savedRecipes: arrayUnion(recipeId),
    });
  }
};

const recipeCommentCreate = (
  body: string
): DocumentReference<DocumentData, DocumentData> => {
  const recipesCommentsRef: CollectionReference<DocumentData, DocumentData> =
    collection(DATA_BASE, "RecipesComments");
  const commentRef = doc(recipesCommentsRef);
  setDoc(commentRef, {
    body: body,
    time: Timestamp.now(),
    user: getUserRef(),
  });
  return commentRef;
};

const recipeCommentHandler = async (
  body: string,
  recipeRef: DocumentReference
): Promise<void> => {
  const recipeCommentRef = recipeCommentCreate(body);
  await updateDoc(recipeRef, {
    comments: arrayUnion(recipeCommentRef),
  });
};

export { likeHandler, recipeSaveHandler, recipeCommentHandler };
