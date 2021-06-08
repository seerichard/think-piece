import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null });

  useEffect(() => {
    // Will trigger when user goes from logged in -> logged out and vice versa
    // Will get user object if logged in, null if logged out
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);

      setUser(user);
    });

    return unsubscribeFromAuth;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
