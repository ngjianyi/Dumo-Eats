import { createContext, useState} from 'react';
interface AutoRefreshContextValue {
    calorie: number;
    setCalorie: React.Dispatch<React.SetStateAction<number>>;
}

const CalorieGoal= createContext<AutoRefreshContextValue | undefined>(undefined)
export default CalorieGoal;