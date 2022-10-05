import { createContext, useState } from 'react'

export const BudgetContext = createContext()

const BudgetContextProvider = (props) => {


    const [budget, setBudget] = useState({money: 22})
    
    return (
        <BudgetContext.Provider value={budget}>{props.children}</BudgetContext.Provider>
    )
}

export default BudgetContextProvider
