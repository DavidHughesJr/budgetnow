import { createContext, useReducer } from 'react'


const BudgetReducer = (state, action) => {
    switch(action.type){
        default: return state 
    }
}

const initialState = {
    budget: 10000,
    expenses: [
        { id: 1, name: 'netflix', cost: 14.99 },
        { id: 2, name: 'water', cost: 65.21 }
    ]
}


export const BudgetContext = createContext()

const BudgetContextProvider = (props) => {

    const [state, dispatch] = useReducer(BudgetReducer, initialState)
    
    return (
        <BudgetContext.Provider value={{
            budget: state.budget,
            expenses: state.expenses,
            dispatch
        }}>{props.children}</BudgetContext.Provider>
    )
}

export default BudgetContextProvider
