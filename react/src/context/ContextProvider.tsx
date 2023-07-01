import { createContext, useContext, useState } from "react";
import {User} from "../types/types.ts";

type StateContextType = {
  currentUser: User | null;
  token: string | null;
  user: User | {};
  setUser: React.Dispatch<React.SetStateAction<User | {}>>;
  setToken: (token: string | null) => void;
};

const StateContext = createContext<StateContextType>({
  currentUser: null,
  token: null,
  user: {},
  setUser: () => {},
  setToken: () => {}
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | {}>({});
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem('ACCESS_TOKEN')
  );

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    <StateContext.Provider value={{ currentUser: null, token, user, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => useContext(StateContext);
