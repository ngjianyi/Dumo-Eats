import {
  getDoc,
  addDoc,
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
  setHeart: React.Dispatch<React.SetStateAction<boolean>>,
  setLikes: React.Dispatch<React.SetStateAction<number>>,
  itemRef: DocumentReference<DocumentData, DocumentData>
): Promise<void> => {
  setHeart((prev) => !prev);

  const currentDoc = (await getDoc(itemRef)).data();
  if (currentDoc?.likes.includes(getUserId())) {
    setLikes(currentDoc?.likes.length - 1);
    await updateDoc(itemRef, {
      likes: arrayRemove(getUserId()),
    });
  } else {
    setLikes(currentDoc?.likes.length + 1);
    await updateDoc(itemRef, {
      likes: arrayUnion(getUserId()),
    });
  }
};

const recipeSaveHandler = async (
  setSaved: React.Dispatch<React.SetStateAction<boolean>>,
  recipeId: string
): Promise<void> => {
  setSaved((prev) => !prev);

  const userData = (await getUserDocSnap()).data();
  if (userData?.savedRecipes.includes(recipeId)) {
    await updateDoc(getUserRef(), {
      savedRecipes: arrayRemove(recipeId),
    });
  } else {
    await updateDoc(getUserRef(), {
      savedRecipes: arrayUnion(recipeId),
    });
  }
};

const recipeCommentCreate = async (
  body: string
): Promise<DocumentReference<DocumentData, DocumentData> | null> => {
  const recipesCommentsRef: CollectionReference<DocumentData, DocumentData> =
    collection(DATA_BASE, "RecipesComments");
  const commentRef: DocumentReference<DocumentData, DocumentData> =
    await addDoc(recipesCommentsRef, {
      body: body,
      time: Timestamp.now(),
      user: getUserRef(),
    });
  return commentRef;
};

const recipeCommentHandler = async (
  body: string,
  recipeRef: DocumentReference
) => {
  const recipeCommentRef = await recipeCommentCreate(body);
  await updateDoc(recipeRef, {
    comments: arrayUnion(recipeCommentRef),
  });
};

export { likeHandler, recipeSaveHandler, recipeCommentHandler };
