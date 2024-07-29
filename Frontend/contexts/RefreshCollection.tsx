import { createContext } from "react";

interface RefreshCollectionContext {
  refreshCollection: boolean;
  setRefreshCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

const RefreshCollectionContext = createContext<
  RefreshCollectionContext | undefined
>(undefined);

export default RefreshCollectionContext;
