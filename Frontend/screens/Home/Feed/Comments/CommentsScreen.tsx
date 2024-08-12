// import {
//   Text,
//   View,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Keyboard,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import React, {
//   useState,
//   useCallback,
//   Dispatch,
//   SetStateAction,
//   useContext,
// } from "react";
// import { DocumentData, DocumentReference } from "firebase/firestore";
// import { commentHandler } from "@/utils/social/SocialHandlers";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import CommentsList from "./CommentsList";
// import RefreshCommentContext from "@/contexts/RefreshComment";
// import { PostItem } from "../Post";

// interface Props {
//   item: PostItem;
//   visible: boolean;
//   setVisible: Dispatch<SetStateAction<boolean>>;
//   comments: DocumentReference<DocumentData, DocumentData>[];
// }

// export default function CommentsScreen({
//   item,
//   visible,
//   setVisible,
//   comments,
// }: Props) {
//   const [input, setInput] = useState<string>("");
//   const postref: DocumentReference = item.postRef;
//   const refreshCommentContext = useContext(RefreshCommentContext);
//   const commentButtonHandler = useCallback(
//     async (trimmedBody: string): Promise<void> => {
//       await commentHandler(trimmedBody, postref, "PostsComments");
//       refreshCommentContext?.setRefreshComment(
//         (refreshComment) => !refreshComment
//       );
//       setInput("");
//       Keyboard.dismiss();
//     },
//     []
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Comments</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.closeButton}
//           onPress={() => setVisible(!visible)}
//         >
//           <Ionicons name="close-sharp" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.commentsSection}>
//         <CommentsList comments={comments} />
//       </View>

//       <KeyboardAvoidingView
//         style={styles.inputContainer}
//         behavior={Platform.OS === "ios" ? "position" : "height"}
//       >
//         <View style={styles.input}>
//           <View style={{ marginRight: 5, width: "100%" }}>
//             <TextInput
//               style={{ marginRight: 10, width: "90%" }}
//               placeholder="Add comment"
//               value={input}
//               multiline={true}
//               onChangeText={(val) => setInput(val)}
//               autoCorrect={false}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => commentButtonHandler(input)}
//             style={styles.sendButton}
//           >
//             <Ionicons name="send" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   header: {
//     flexDirection: "row",
//     marginTop: 20,
//     width: "95%",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     backgroundColor: "turquoise",
//   },
//   title: {
//     fontSize: 25,
//     textAlign: "center",
//   },

//   closeButton: {
//     position: "absolute",
//     backgroundColor: "red",
//     borderRadius: 5,
//     right: 2,
//   },
//   commentsSection: {
//     flex: 1,
//     width: "100%",
//   },
//   inputContainer: {
//     width: "100%",
//   },

//   input: {
//     backgroundColor: "gainsboro",
//     padding: 10,
//     width: "100%",
//     alignSelf: "center",
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   sendButton: {
//     position: "absolute",
//     right: 0,
//     marginLeft: 10,
//   },
// });
