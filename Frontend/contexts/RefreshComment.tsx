import { createContext, useState} from 'react';

interface AutoRefreshContextValue {
    refreshComment: boolean;
    setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const RefreshCommentContext = createContext<AutoRefreshContextValue | undefined>(undefined)
export default RefreshCommentContext;