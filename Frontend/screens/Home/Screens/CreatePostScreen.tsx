import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  ImageSourcePropType,
} from "react-native";
import React, { useState, useContext } from "react";
import { Formik, FormikProps } from "formik";
import * as ImagePicker from "expo-image-picker";
import { AUTH, DATA_BASE, STORAGE } from "@/firebaseCONFIG";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import moment from "moment";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";

interface Props {
  upload: boolean;
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreatePostScreen({
  upload,
  setUpload,
  refresh,
  setRefresh,
}: Props) {

  const refreshContext = useContext(RefreshBadgeContext);
  const img: ImageSourcePropType = require("@/assets/images/imagePlaceholder.png");

  interface FormValues {
    caption: string;
    image: string;
    time: string;
    likes: [];
    comments: [];
    postRef: DocumentReference | null;
    userRef: DocumentReference | null;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitHandler = async (value: any) => {
    setLoading(true);
    value.image = image;
    Keyboard.dismiss();
    const userName = (await getUserDocSnap()).data()?.userName;
    /**
     * converting uri into blob, then upload into firebase storage, then get download url
     * add the download url to value.image and send it to data base after submitting the formik form
     */
    try {
      const response: Response = await fetch(value.image);
      const blob: Blob = await response.blob();

      const storageRef = ref(STORAGE, "DumoEatsPosts/" + Date.now() + ".jpg");
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("Uploaded a blob");
        })
        .then((response) => {
          getDownloadURL(storageRef).then(async (dlURL) => {
            value.image = dlURL;
            const docRefUser = doc(
              DATA_BASE,
              "Users",
              "" + AUTH.currentUser?.uid
            );
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
              await getUserDocSnap();
            value.time = moment().format("LLL"); // June 19, 2024 11:22 AM
            //check for whtehr its first post for necessary achievemtn
            const firstTime: boolean = !docSnap.data()?.badges[2];
            const temp: boolean[] = docSnap.data()?.badges;
            if (firstTime) {
              temp[2] = true;
            }

            //create a reference for doc that will point to Subcollection eg
            const id: string = "" + AUTH.currentUser?.uid;
            // const subCollectionDocRef = doc(DATA_BASE, "Posts",id);
            const subCollectionDocRef = doc(DATA_BASE, "Posts", userName);
            const docSnapshot = await getDoc(subCollectionDocRef);

            //if first time uploading, set document
            if (!docSnapshot.exists()) {
              await setDoc(
                subCollectionDocRef,
                { valid: "YES" },
                { merge: true }
              );
            }
            //create a reference for subcollection
            const subcollectionRef = collection(
              subCollectionDocRef,
              userName + "'s posts"
            );
            //create a doc reference for each post
            const postref: DocumentReference = doc(subcollectionRef);
            value.postRef = postref;
            value.userRef = getUserRef();
            //add the whole post data as a document in sub collection
            await setDoc(postref, value);

            //user's own posts will be added to saved collection
            await updateDoc(docRefUser, {
              collection: arrayUnion(postref),
              badges: temp,
            });
            setLoading(false);
            Alert.alert("Uploaded", "post uploaded successfully", [
              {
                text: "OK",
                onPress: () => {
                  setRefresh(!refresh);
                  setImage(null);
                  setUpload(!upload);
                  if (firstTime) {
                    alert("New badge 'Upcoming Influencer' unlocked!");
                    refreshContext?.setRefreshBadge(
                      !refreshContext?.refreshBadge
                    );
                  }
                },
              },
            ]);
          });
        });
    } catch (error) {
      alert("no image uploaded");
      setLoading(false);
      console.log("error uploading post");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Text style={styles.header}>Create New Post</Text>
          <Formik
            initialValues={{
              caption: "",
              image: "",
              time: "",
              likes: [],
              comments: [],
              postRef: null,
              userRef: null,
            }}
            //the val is initialValues after being updated with new values
            onSubmit={(val, { resetForm }) => {
              onSubmitHandler(val);
              resetForm();
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
            }: FormikProps<FormValues>) => (
              <View>
                <TouchableOpacity style={styles.image} onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.Pic} />
                  ) : (
                    <Image source={img} style={styles.Pic} />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor={"lightgrey"}
                  value={values?.caption}
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                >
                  {loading ? (
                    <ActivityIndicator color="black" />
                  ) : (
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                      Upload
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => setUpload(!upload)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 17,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 80,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 17,
  },
  button: {
    backgroundColor: "lightblue",
    marginHorizontal: 150,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    marginVertical: 20,
    alignItems: "center",
  },
  Pic: {
    height: 250,
    width: 250,
    borderRadius: 50,
  },
});
