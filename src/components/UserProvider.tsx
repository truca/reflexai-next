import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserContextValue {
  userId?: string;
  userName?: string;
  setUserData: (userId: string, userName: string) => void;
}

export const UserContext = React.createContext<UserContextValue>({
  setUserData: () => {},
});

const USER_DATA_KEY = "REFLEXAI_USER";
const LOGIN_PATHS = ["/login", "/register"];

interface UserProviderProps {
  children: any;
}

function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const { pathname, push } = useRouter();

  // initialization
  useEffect(() => {
    const localValue = localStorage.getItem(USER_DATA_KEY);

    const isLoggedIn = Boolean(localValue);
    const isInLoginPath = LOGIN_PATHS.includes(pathname);
    if (!isLoggedIn && !isInLoginPath) {
      push("/login");
      return;
    }

    if (!isLoggedIn) return;

    const { userId: userIdArg, userName: userNameArg } = JSON.parse(localValue);
    setUserId(userIdArg);
    setUserName(userNameArg);
    if (isInLoginPath) {
      push("/chat");
    }
  }, []);

  const setUserData = useCallback((userIdArg: string, userNameArg: string) => {
    localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify({ userId: userIdArg, userName: userNameArg })
    );
    setUserId(userIdArg);
    setUserName(userNameArg);
  }, []);

  return (
    <UserContext.Provider value={{ userId, userName, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
