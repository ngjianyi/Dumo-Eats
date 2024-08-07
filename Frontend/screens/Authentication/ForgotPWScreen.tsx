import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AUTH } from "@/firebaseCONFIG";
import { sendPasswordResetEmail } from "firebase/auth";
import { Propsforget } from "@/components/navigation/PropTypes";
import { COLORS, SIZES } from "@/constants/Theme";

export default function ForgotScreen({ navigation }: Propsforget) {
  const backHandler = (): void => navigation.navigate("login");
  const [email, setEmail] = useState<string>("");

  const sendReset = () => {
    if (!email) {
      Alert.alert("", "Please enter an email");
      return;
    }

    sendPasswordResetEmail(AUTH, email)
      .then(() => {
        console.log("Successfully sent email");
      })
      .catch((error) => {
        console.log("Error: " + error.message);
      });

    Alert.alert(
      "",
      "The link to reset your password has been sent to your email"
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Reset password</Text>
        </View>

        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.gray}
            placeholder="Email"
            value={email}
            onChangeText={(val) => {
              setEmail(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Email"
          />

          <View style={styles.forgetPasswordContainer}>
            <TouchableOpacity onPress={backHandler}>
              <Text style={styles.blueText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submit} onPress={sendReset}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.medium,
    margin: SIZES.xSmall,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },

  details: {
    margin: SIZES.xxLarge,
  },
  forgetPasswordContainer: {
    alignItems: "flex-end",
  },
  blueText: {
    fontSize: SIZES.medium,
    color: COLORS.blue,
    marginVertical: SIZES.xSmall / 4,
  },
  submit: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },

  submitText: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
    color: "black",
  },
});
