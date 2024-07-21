import React from "react";
import { render, screen } from "@testing-library/react-native";
import LoginScreen from "../LoginScreen";
import { RootStackParamList } from "@/app";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

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
  it("Renders username input box ", () => {
    render(
      <LoginScreen
        navigation={mockNavigation as LoginScreenNavigationProp}
        route={mockRoute}
      />
    );
    const usernamebox = screen.getByLabelText("Email");
    expect(usernamebox).toBeTruthy();
    expect(usernamebox.props.placeholder).toBe(" Email");
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
    expect(usernamebox.props.placeholder).toBe(" Password");
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
});
