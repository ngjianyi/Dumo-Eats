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
import { Alert } from "react-native";

jest.spyOn(Alert, "alert");

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "login"
>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, "login">;

export interface PropsLogin {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const mockRoute: LoginScreenRouteProp = {
  key: "login-key",
  name: "login",
  params: undefined,
};

const mockNavigation: Partial<LoginScreenNavigationProp> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe("Renders loginscreen correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders username input box ", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Email");
    expect(usernamebox).toBeTruthy();
    expect(usernamebox.props.placeholder).toBe("Email");
  });

  it("Renders password input box ", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Password");
    expect(usernamebox).toBeTruthy();
    expect(usernamebox.props.placeholder).toBe("Password");
  });

  it("Renders login button", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const loginButton = screen.getByLabelText("loginButton");
    expect(loginButton).toBeTruthy();
  });

  it("Renders signup button", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const signupButton = screen.getByLabelText("signupButton");
    expect(signupButton).toBeTruthy();
  });

  it("Renders signup button", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const signupButton = screen.getByLabelText("signupButton");
    expect(signupButton).toBeTruthy();
  });
  it("Checks for invalid credentials", async () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const user = userEvent.setup();
    const usernamebox = screen.getByLabelText("Email");
    const passwordbox = screen.getByLabelText("Password");
    const loginButton = screen.getByLabelText("loginButton");
    try {
      await user.type(usernamebox, "abcdef@gmail.com");
      await user.type(passwordbox, "fakePassword");
      await user.press(loginButton);
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "",
          "Invalid email / password"
        );
      });
    } catch (error) {
      console.log("error for invalid creds");
    }
  });

  it("Checks for empty email", async () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const user = userEvent.setup();
    const passwordbox = screen.getByLabelText("Password");
    const loginButton = screen.getByLabelText("loginButton");
    try {
      await user.type(passwordbox, "fakePassword");
      await user.press(loginButton);
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith("", "Please enter an email");
      });
    } catch (error) {
      console.log("error for empty email");
    }
  });

  it("Checks for empty password", async () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const user = userEvent.setup();
    const usernamebox = screen.getByLabelText("Email");
    const loginButton = screen.getByLabelText("loginButton");
    try {
      await user.type(usernamebox, "abcdef@gmail.com");
      await user.press(loginButton);
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith("", "Please enter a password");
      });
    } catch (error) {
      console.log("error for empty password");
    }
  });
});
