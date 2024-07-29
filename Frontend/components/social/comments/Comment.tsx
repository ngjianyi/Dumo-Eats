import { View, StyleSheet, Text, Image} from "react-native";
import { DocumentReference, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "@/constants/Theme";
import TimeElapsed from "@/utils/functions/TimeElapsed/TimeElapsed";

type Props = {
  commentRef: DocumentReference;
};
const profilepic = require("@/assets/images/defaultProfile.png");

export default function Comment({ commentRef }: Props) {

  const [username, setUsername] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<string>("")
  const getComment = async () => {
    const commentDocSnap = await getDoc(commentRef);
    if (commentDocSnap.exists()) {
      const commentData = commentDocSnap.data();
      const userRef: DocumentReference = commentData.user;
      const userDocSnap = await getDoc(userRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.userName);
        setImage(userData.profilePic)
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
        <View style={styles.picContainer}>
          {
            image != "" 
            ? <Image source={{uri: image}} style={styles.pic}/>
            : <Image source ={profilepic} style={styles.pic}/>
          }
        </View>
        <View>
          <View style={styles.words}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.date}> {date}</Text>  
          </View>
          <Text style={styles.body}>{body}</Text>
        </View>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SIZES.xSmall },
  header: { flexDirection: "row" },

  
  picContainer: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginLeft: 5,
    marginRight:5,
  },

  pic: {
    width:"100%",
    height:"100%",
    borderRadius: 20,
  },
  
  words: {
    flexDirection:"row",
  },

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
