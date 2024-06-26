import { createContext, useState} from 'react';

interface AutoRefreshContextValue {
    refreshBadge: boolean;
    setRefreshBadge: React.Dispatch<React.SetStateAction<boolean>>;
}

const RefreshBadgeContext = createContext<AutoRefreshContextValue | undefined>(undefined)
export default RefreshBadgeContext;