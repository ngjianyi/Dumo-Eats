import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { RootStackParamList } from "@/app";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import SignupScreen from "../SignupScreen";
import { getDocs } from "firebase/firestore";

import { Alert } from "react-native";
jest.spyOn(Alert, "alert");

/**
 * mock firebase/firestore module by declaring the getDocs as a mock jest function
 */
jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  return {
    ...originalModule,
    getDocs: jest.fn(),
  };
});

/**
 * Mock implementation of the getDocs function and declaration of forEach method
 * forEach method takes in a callback method that handles each document in the mock collection
 * @returns Instance of a Promise object which has a forEach method
 */
(getDocs as jest.Mock).mockImplementation(() =>
  Promise.resolve({
    forEach: (
      callback: (document: { data: () => { username: string } }) => void
    ) => {
      callback({ data: () => ({ username: "dudu" }) });
    },
  })
);

// global.alert = jest.fn();

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "signup"
>;

type SignUpScreenRouteProp = RouteProp<RootStackParamList, "signup">;

export interface PropsLogin {
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}
const mockRoute: SignUpScreenRouteProp = {
  key: "login-key",
  name: "signup",
  params: undefined,
};

const mockNavigation: Partial<SignUpScreenNavigationProp> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe("SignUp screen renders correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Username textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    expect(usernamebox).toBeTruthy();
  });

  it("First name textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const firstnamebox = screen.getByLabelText("Firstname");
    expect(firstnamebox).toBeTruthy();
  });

  it("Last name textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const lastnamebox = screen.getByLabelText("Lastname");
    expect(lastnamebox).toBeTruthy();
  });

  it("Email textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const emailbox = screen.getByLabelText("Email");
    expect(emailbox).toBeTruthy();
  });

  it("Password textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const password1 = screen.getByLabelText("Password1");
    expect(password1).toBeTruthy();
  });

  it("Password confirmation textbox renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const password2 = screen.getByLabelText("Password2");
    expect(password2).toBeTruthy();
  });

  it("Signup button renders", () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const signupbutton = screen.getByLabelText("SignupButton");
    expect(signupbutton).toBeTruthy();
  });

  it("Checks for email that is already in use", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "ngjianyi2002@gmail.com");
    await user.type(password1, "password123");
    await user.type(password2, "password123");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Email already in use");
    // });
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("", "Email is already in use");
    });
  });

  it("Checks for username that is already in use", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "dudu");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "abcdef@gmail.com");
    await user.type(password1, "password123");
    await user.type(password2, "password123");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Username is already taken");
    // });
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("", "Username has been taken");
    });
  });

  it("Checks for email that is invalid", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "fake.com");
    await user.type(password1, "password123");
    await user.type(password2, "password123");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Invalid email");
    // });
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "",
        "Please enter a valid email"
      );
    });
  });

  it("Checks for passwords that do not match", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "abc@gmail.com");
    await user.type(password1, "password");
    await user.type(password2, "password123");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Passwords do not match");
    // });
    expect(Alert.alert).toHaveBeenCalledWith("", "Passwords do not match");
  });

  it("Checks for password that is too short", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "abc@gmail.com");
    await user.type(password1, "s");
    await user.type(password2, "s");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith(
    //     "Password too short, must be at least 6 characters"
    //   );
    // });
    expect(Alert.alert).toHaveBeenCalledWith(
      "",
      "Password must have at least 6 characters"
    );
  });

  it("Checks for missing username", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "abc@gmail.com");
    await user.type(password1, "abcde");
    await user.type(password2, "abcde");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Missing username");
    // });
    expect(Alert.alert).toHaveBeenCalledWith("", "Please enter a username");
  });

  it("Checks for missing password", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "abc@gmail.com");
    await user.type(password1, "");
    await user.type(password2, "");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Missing password");
    // });
    expect(Alert.alert).toHaveBeenCalledWith("", "Please enter a password");
  });

  it("Checks for missing Email", async () => {
    render(
      <SignupScreen
        navigation={mockNavigation as SignUpScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Username");
    const firstnamebox = screen.getByLabelText("Firstname");
    const lastnamebox = screen.getByLabelText("Lastname");
    const emailbox = screen.getByLabelText("Email");
    const password1 = screen.getByLabelText("Password1");
    const password2 = screen.getByLabelText("Password2");
    const signupbutton = screen.getByLabelText("SignupButton");

    const user = userEvent.setup();
    await user.type(usernamebox, "test123");
    await user.type(firstnamebox, "test");
    await user.type(lastnamebox, "test");
    await user.type(emailbox, "");
    await user.type(password1, "abcdef");
    await user.type(password2, "abcdef");
    await user.press(signupbutton);
    // await waitFor(() => {
    //   expect(global.alert).toHaveBeenCalledWith("Missing email");
    // });
    expect(Alert.alert).toHaveBeenCalledWith("", "Please enter an email");
  });
});
