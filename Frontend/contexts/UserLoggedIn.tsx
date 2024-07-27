import { createContext, useState } from "react";

interface UserLoggedInInterface {
  UserLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserLoggedInContext = createContext<UserLoggedInInterface | undefined>(
  undefined
);

export default UserLoggedInContext;
