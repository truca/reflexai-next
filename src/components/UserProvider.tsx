import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserContextValue {
  userId?: string;
  userName?: string;
  setUserContextValues: (userId: string, userName: string) => void;
}

export const UserContext = React.createContext<UserContextValue>({
  setUserContextValues: () => {},
});

const USER_DATA_KEY = "REFLEXAI_USER";
const UNAUTHORIZED_ROUTES = ["/login", "/register"];

interface UserProviderProps {
  children: any;
}

function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const { pathname } = useRouter();

  useEffect(() => {
    const localValue = localStorage.getItem(USER_DATA_KEY);

    if (!localValue && !UNAUTHORIZED_ROUTES.includes(pathname)) {
      window.location = "/login";
      return;
    }
    if (!localValue) return;

    const { userId: userIdArg, userName: userNameArg } = JSON.parse(localValue);
    setUserId(userIdArg);
    setUserName(userNameArg);
    if (UNAUTHORIZED_ROUTES.includes(pathname)) {
      window.location = "/chat";
    }
  }, []);

  const setUserContextValues = useCallback(
    (userIdArg: string, userNameArg: string) => {
      localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify({ userId: userIdArg, userName: userNameArg })
      );
      setUserId(userIdArg);
      setUserName(userNameArg);
    },
    []
  );

  return (
    <UserContext.Provider value={{ userId, userName, setUserContextValues }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
