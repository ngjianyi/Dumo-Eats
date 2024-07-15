import { DocumentReference, Timestamp } from "firebase/firestore";

type LikesType = string[];

type CommentType = {
  user: DocumentReference;
  body: string;
  time: Timestamp;
};

export { LikesType, CommentType };
