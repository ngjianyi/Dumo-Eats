import { FlatList } from "react-native";
import React from "react";
import SavePost from "./SavePost";
import { DocumentReference } from "firebase/firestore";

interface Props {
  collectionArray: DocumentReference[];
}

export default function CollectionList({ collectionArray }: Props) {
  return (
    <FlatList
      showsVerticalScrollIndicator={true}
      data={collectionArray}
      renderItem={({ item }) => <SavePost item={item} />}
    />
  );
}
