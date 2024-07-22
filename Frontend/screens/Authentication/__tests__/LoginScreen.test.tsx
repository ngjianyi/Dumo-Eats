import React, { useContext } from "react";
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
import HomeScreen from "@/screens/Home/Screens/HomeScreen";
import ForgotScreen from "../ForgotPWScreen";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
global.alert = jest.fn();

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

const mockNavigationTest = {
    navigate: jest.fn(),
};

const navigate = jest.fn()


describe("Renders loginscreen correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

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

  it("Checks for invalid email", async () => {
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
        await user.type(usernamebox, "nonsense");
        await user.press(loginButton);
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith("Invalid email provided");
        });

    } catch(error) {
        console.log("error for invalid email")
    }
    
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
            expect(global.alert).toHaveBeenCalledWith("Invalid credentials provided");
        });

    } catch(error) {
        console.log("error for invalid creds")
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
            expect(global.alert).toHaveBeenCalledWith("Please enter password");
        });
    } catch (error) {
        console.log("error for empty password")
    }
  });




  // it("Checks that valid accounts are navigated to homescreen", async () => {
  //   render(
  //     <LoginScreen
  //       navigation={mockNavigationTest as unknown as LoginScreenNavigationProp}
  //       route={mockRoute}
  //     />
  //   );
  //   const user = userEvent.setup();
  //   const usernamebox = screen.getByLabelText("Email");
  //   const passwordbox = screen.getByLabelText("Password");
  //   const loginButton = screen.getByLabelText("loginButton");
  //   await user.type(usernamebox, "cjianzhi23@gmail.com");
  //   await user.type(passwordbox, "qwery");
  //   await user.press(loginButton);
  //   expect(HomeScreen).toHaveBeenCalled
  // });
});
