import { createContext, Dispatch, SetStateAction } from "react";

export type AppContextType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext({} as AppContextType);
