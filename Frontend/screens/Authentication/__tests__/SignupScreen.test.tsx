import React from "react";

import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import LoginScreen from "../LoginScreen";
import { RootStackParamList } from "@/app";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import SignupScreen from "../SignupScreen";

global.alert = jest.fn();

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
    const lastnamebox = screen.getByLabelText("Lastname");
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

//   it("Checks for email that is already in use", async () => {
//     render(
//       <SignupScreen
//         navigation={mockNavigation as SignUpScreenNavigationProp}
//         route={mockRoute}
//       />
//     );
//     const usernamebox = screen.getByLabelText("Username");
//     const firstnamebox = screen.getByLabelText("Firstname");
//     const lastnamebox = screen.getByLabelText("Lastname");
//     const emailbox = screen.getByLabelText("Email");
//     const password1 = screen.getByLabelText("Password1");
//     const password2 = screen.getByLabelText("Password2");
//     const signupbutton = screen.getByLabelText("SignupButton");

//     const user = userEvent.setup();
//     await user.type(usernamebox, "tester");
//     await user.type(firstnamebox, "test");
//     await user.type(lastnamebox, "test");
//     await user.type(emailbox, "cjianzhi23@gmail.com");
//     await user.type(password1, "password123");
//     await user.type(password2, "password123");
//     await user.press(signupbutton);
//     await waitFor(() => {
//       expect(global.alert).toHaveBeenCalledWith("Email already in used");
//     });
//   });

//   it("Checks for email that is invalid", async () => {
//     render(
//       <SignupScreen
//         navigation={mockNavigation as SignUpScreenNavigationProp}
//         route={mockRoute}
//       />
//     );
//     const usernamebox = screen.getByLabelText("Username");
//     const firstnamebox = screen.getByLabelText("Firstname");
//     const lastnamebox = screen.getByLabelText("Lastname");
//     const emailbox = screen.getByLabelText("Email");
//     const password1 = screen.getByLabelText("Password1");
//     const password2 = screen.getByLabelText("Password2");
//     const signupbutton = screen.getByLabelText("SignupButton");

//     const user = userEvent.setup();
//     await user.type(usernamebox, "tester");
//     await user.type(firstnamebox, "test");
//     await user.type(lastnamebox, "test");
//     await user.type(emailbox, ".com");
//     await user.type(password1, "password123");
//     await user.type(password2, "password123");
//     await user.press(signupbutton);
//     await waitFor(() => {
//       expect(global.alert).toHaveBeenCalledWith("Invalid email");
//     });
//   });

//   it("Checks for passwords that do not match", async () => {
//     render(
//       <SignupScreen
//         navigation={mockNavigation as SignUpScreenNavigationProp}
//         route={mockRoute}
//       />
//     );
//     const usernamebox = screen.getByLabelText("Username");
//     const firstnamebox = screen.getByLabelText("Firstname");
//     const lastnamebox = screen.getByLabelText("Lastname");
//     const emailbox = screen.getByLabelText("Email");
//     const password1 = screen.getByLabelText("Password1");
//     const password2 = screen.getByLabelText("Password2");
//     const signupbutton = screen.getByLabelText("SignupButton");

//     const user = userEvent.setup();
//     await user.type(usernamebox, "tester");
//     await user.type(firstnamebox, "test");
//     await user.type(lastnamebox, "test");
//     await user.type(emailbox, ".com");
//     await user.type(password1, "password");
//     await user.type(password2, "password123");
//     await user.press(signupbutton);
//     await waitFor(() => {
//       expect(global.alert).toHaveBeenCalledWith("Passwords do not match");
//     });
//   });
});
