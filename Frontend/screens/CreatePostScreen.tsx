import { ScrollView, Text, View, StyleSheet, SafeAreaView , TextInput, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import React, { useState } from "react";
import { Formik, FormikProps } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import {AUTH, DATA_BASE, STORAGE}  from "@/firebaseCONFIG";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {collection, doc,getDoc,addDoc, setDoc, updateDoc } from "firebase/firestore"; 
import moment from 'moment'


export default function CreatePostScreen() {
    const img = require("@/assets/images/imagePlaceholder.png")
    interface FormValues {
        caption: string;
        image: string;
        userName: string;
        time: string;
    }
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
    const onSubmitHandler = async (value: any) => {
        setLoading(true);
        value.image = image;
        Keyboard.dismiss()
        console.log(value)
        try {
            //converting uri into blob, then upload into firebase storage, then get download url then save
            //formik form image value as download url
            //then add the download url to value.image and send it and value.caption
            // to firestore data base after submitting the formik form
            const response = await fetch(value.image);
            const blob = await response.blob();
            const storageRef = ref(STORAGE, 'DumoEatsPosts/' + Date.now() + '.jpg');
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob');
              }).then((response) => {
                getDownloadURL(storageRef)
                .then(async (dlURL) => {
                    console.log(dlURL)
                    value.image = dlURL
                    //add user name to each posts
                    const docRefUser = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid);
                    const docSnap = await getDoc(docRefUser);
                    value.userName = docSnap.data()?.userName;
                    //add time
                    value.time = moment().format('LLL');  // June 19, 2024 11:22 AM
                    
                    //create a reference for doc that will point to Subcollection eg
                    const id: string = "4" + AUTH.currentUser?.uid
                    const subCollectionDocRef = doc(DATA_BASE, "Posts",id);
                    const docSnapshot = await getDoc(subCollectionDocRef);  

                    //if first time uploading, set document
                    if (!docSnapshot.exists()) {
                        await setDoc(subCollectionDocRef, { valid: "YES" }, { merge: true });
                    }
                    //create a reference for subcollection 
                    const subcollectionRef = collection(subCollectionDocRef, value.userName +"'s posts")
                    const postDocRef = await addDoc(subcollectionRef, value);
                    console.log("Document written with UID: ");
                })
              });
              setLoading(false);
              setImage(null);
              alert("post uploaded successfully")
        } catch(error) {
            alert("no image uploaded")
            setLoading(false)
            console.log("error uploading post")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <Text style={styles.header}>Create New Post</Text>
                    <Formik
                    initialValues={{ caption:'', image:'', userName:'', time:''}}
                    //the val is initialValues after being updated with new values
                    onSubmit={(val, {resetForm}) =>{
                        onSubmitHandler(val)
                        resetForm()
                    }}
                    // validate={(values) => {
                    //     const errors: { [key: string]: string } = {};
                    //      if (!values.image) {
                    //         errors.image = 'Image missing'
                    //         alert(errors.image)
                    //     }
                    //     return errors;
                    // }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors}: FormikProps<FormValues>) => (
                            <View >
                                <TouchableOpacity style={styles.image}onPress={pickImage}>
                                    {image 
                                        ? <Image source={{uri: image}} style={styles.Pic}/>
                                        : <Image source={img} style={styles.Pic}/>
                                    }
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    placeholderTextColor={'lightgrey'}
                                    value={values?.caption}
                                    multiline={true}
                                    onChangeText={handleChange('caption')}
                                />
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => handleSubmit()}>
                                    {loading 
                                    ? <ActivityIndicator color='black'/>
                                    :<Text style={{textAlign:"center", fontSize:20,}}>Upload</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal:17,
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    input: {
        borderWidth:1,
        borderRadius:10,
        padding:5,
        paddingVertical:20,
        marginVertical: 20,
        marginHorizontal:25,
        fontSize:17,
    },
    button: {
        backgroundColor:"lightblue",
        marginHorizontal: 150,
        borderRadius: 15,
        padding: 10,

    },
    image: {
        marginVertical:20,
        alignItems: 'center'
    },
    Pic: {
        height: 250,
        width: 250,
        borderRadius: 50,
    },

})