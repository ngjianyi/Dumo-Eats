import { createContext, useState} from 'react';
interface AutoRefreshContextValue {
    autoRefresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const [dummy, setDummy] = useState(false)
const AutoRefresh = createContext<AutoRefreshContextValue | undefined>(undefined)
export default AutoRefresh;