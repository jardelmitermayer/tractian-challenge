import { useContext } from "react";
import { TreeStateContext } from "./TreeProvider";

export const useTreeState = () => {
  const context = useContext(TreeStateContext);
  if (!context) {
    throw new Error("useTreeState must be used within a TreeProvider");
  }
  return context;
};
