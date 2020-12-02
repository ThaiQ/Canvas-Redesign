import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [name, setName] = useState("CMPE-133");
  const [session, setSession] = useState("1");

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        session,
        setSession
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
