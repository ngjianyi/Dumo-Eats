import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { getUserId, getUserDocSnap, getUserRef } from "./User";

const likeHandler = async (
  setHeart: React.Dispatch<React.SetStateAction<boolean>>,
  setLikes: React.Dispatch<React.SetStateAction<number>>,
  itemRef: DocumentReference<DocumentData, DocumentData>
) => {
  setHeart((prev: boolean) => !prev);

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

const recipesSaveHandler = async (
  setSaved: React.Dispatch<React.SetStateAction<boolean>>,
  recipeId: string
) => {
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

export { likeHandler, recipesSaveHandler };
