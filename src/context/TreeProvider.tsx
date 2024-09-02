import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { TreeStateContextProps, TreeNode, TreeAction } from "../types/type";
import { treeReducer } from "./TreeReducer";

const initialState: TreeNode[] = [];
const initialDispatch: Dispatch<TreeAction> = () => { };


export const TreeStateContext = createContext<TreeStateContextProps>({ state: initialState, dispatch: initialDispatch });

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(treeReducer, [] as TreeNode[]);

  return (
    <TreeStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeStateContext.Provider>
  );
};


