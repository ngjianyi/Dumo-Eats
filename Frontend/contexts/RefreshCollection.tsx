import { createContext} from 'react';


interface RefreshCollectionContext{
    refershCollection: boolean,
    setRefreshCollection: React.Dispatch<React.SetStateAction<boolean>>
}

const RefreshCollectionContext = createContext<RefreshCollectionContext | undefined>(undefined)
export default RefreshCollectionContext;