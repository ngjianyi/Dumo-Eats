import { DocumentReference, Timestamp } from "firebase/firestore";

type Likes = string[];

type Comment = {
  user: DocumentReference;
  body: string;
  time: Timestamp;
};

export { Likes, Comment };
