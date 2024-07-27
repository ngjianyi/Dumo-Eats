import { createContext } from "react";

export interface UserLoggedInInterface {
  UserLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserLoggedInContext = createContext<UserLoggedInInterface | undefined>(
  undefined
);

export default UserLoggedInContext;
