import { createContext, useState} from 'react';


interface RefreshCalorieContext{
    refreshCalorie: boolean,
    setRefreshCalorie: React.Dispatch<React.SetStateAction<boolean>>
}

const RefreshCalorieContext = createContext<RefreshCalorieContext | undefined>(undefined)
export default RefreshCalorieContext;