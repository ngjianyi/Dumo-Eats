import { View, StyleSheet, Text } from "react-native";
import { DocumentReference, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "@/constants/Theme";
import TimeElapsed from "@/utils/functions/TimeElapsed/TimeElapsed";

type Props = {
  commentRef: DocumentReference;
};

export default function Comment({ commentRef }: Props) {
  const [username, setUsername] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const getComment = async () => {
    const commentDocSnap = await getDoc(commentRef);
    if (commentDocSnap.exists()) {
      const commentData = commentDocSnap.data();
      const userRef: DocumentReference = commentData.user;
      const userDocSnap = await getDoc(userRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.userName);
      } else {
        setUsername("Unknown");
      }
      setBody(commentData.body);
      setDate(TimeElapsed(commentData.time));
    } else {
      setBody("Something went wrong");
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.date}> {date}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SIZES.xSmall },
  header: { flexDirection: "row" },
  username: {
    fontSize: SIZES.small,
  },
  date: {
    color: COLORS.gray,
    fontSize: SIZES.small,
  },
  body: {
    fontSize: SIZES.medium,
  },
});
