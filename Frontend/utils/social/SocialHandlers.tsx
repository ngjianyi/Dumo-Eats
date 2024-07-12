import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { AUTH } from "@/firebaseCONFIG";
import { getUserID } from "./User";

const likeHandler = async (
  setHeart: React.Dispatch<React.SetStateAction<boolean>>,
  setLikes: React.Dispatch<React.SetStateAction<number>>,
  itemRef: DocumentReference<DocumentData, DocumentData>
) => {
  setHeart((prev: boolean) => !prev);

  const currentDoc = (await getDoc(itemRef)).data();
  if (currentDoc?.likes.includes(getUserID())) {
    setLikes(currentDoc?.likes.length - 1);
    await updateDoc(itemRef, {
      likes: arrayRemove(AUTH.currentUser?.uid),
    });
  } else {
    setLikes(currentDoc?.likes.length + 1);
    await updateDoc(itemRef, {
      likes: arrayUnion(AUTH.currentUser?.uid),
    });
  }
};

export { likeHandler };
