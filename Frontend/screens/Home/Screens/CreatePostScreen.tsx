import {
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES } from "@/constants/Theme";

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

  /**
   * Allow users to choose an image from their phone library
   */
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

  /**
   * Upload formik form values onto firestore Posts collection
   * @param value Formik form values, which consists of post details
   */
  const onSubmitHandler = async (value: any) => {
    setLoading(true);
    value.image = image;
    Keyboard.dismiss();
    const userName = (await getUserDocSnap()).data()?.userName;
    /**
     * Converting image into blob, then upload blob onto firebase storage.
     * Retrieve download url and add the download url to value.image
     * which will be stored in firestore
     */
    try {
      const response: Response = await fetch(value.image);
      const blob: Blob = await response.blob();

      const storageRef = ref(STORAGE, "DumoEatsPosts/" + Date.now() + ".jpg");
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("Uploaded a blob successfully");
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
            //check whether its first post for necessary achievement
            const firstTime: boolean = !docSnap.data()?.badges[2];
            const temp: boolean[] = docSnap.data()?.badges;
            if (firstTime) {
              temp[2] = true;
            }

            //create a reference for doc that will point to Subcollection
            const id: string = "" + AUTH.currentUser?.uid;
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
        <View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setUpload(!upload)}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create a new post</Text>
        </View>

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
          //val is initialValues after being updated with new values
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
              <View style={styles.details}>
                <TextInput
                  style={styles.input}
                  placeholder="Caption"
                  placeholderTextColor={COLORS.gray}
                  value={values?.caption}
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                />
              </View>

              {!loading ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="large" color={COLORS.tertiary} />
              )}
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: SIZES.xSmall * 2,
    marginTop: "20%",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: "25%",
    margin: SIZES.xSmall,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  details: {
    margin: SIZES.xxLarge,
  },
  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },
  buttonText: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
    color: "black",
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
