import { createContext, useReducer } from 'react'
import uuid from 'react-uuid'



const BudgetReducer = (state, action) => {
    switch (action.type) {
        case 'ADD TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        default: return state
    }
}


const initialState = {

    budget: [
        { name: 'income', amount: 6000 },
        { name: 'side hustle', amount: 500 },
        { name: 'investment', amount: 1000 },
        { retirement: 'retirement', amount: 2000 }
    ],
    categories: [
        { name: 'Groceries', cap: 1000 },
        { name: 'Utilities', cap: 1000 },
        { name: 'Transportation', cap: 500 },
        { name: 'Medical', cap: 500 },
        { name: 'Retirement', cap: 500 },
        { name: 'Savings', cap: 100 },
        { name: 'Investments', cap: 100 },
        { name: 'Entertainment', cap: 100 },
        { name: 'Other', cap: 100 },
    ],
    transactions: [
        { id: uuid(), name: 'Kroger', category: 'Groceries', cost: 200 },
        { id: uuid(), name: 'Shell gas', category: 'Transportation', cost: 50 },
        { id: uuid(), name: 'Blue cross insurance', category: 'Insurance', cost: 250 },
        { id: uuid(), name: 'Roth IRA', category: 'Retirement', cost: 500 },
        { id: uuid(), name: 'Extra cash', category: 'Savings', cost: 100 },
        { id: uuid(), name: 'Spotify', category: 'Entertainment', cost: 10 },
    ],
}




export const BudgetContext = createContext()

const BudgetContextProvider = (props) => {


    const [state, dispatch] = useReducer(BudgetReducer, initialState)
    
    const totals = [
        { budget: initialState.budget.reduce((acc, arr) => acc + arr.amount, 0) },
        { categories: initialState.categories.reduce((acc, arr) => acc + arr.cap, 0) },
        { transactions: initialState.transactions.reduce((acc, arr) => acc + arr.cost, 0) }
    ]


    return (
        <BudgetContext.Provider value={{
            budget: state.budget,
            categories: state.categories,
            transactions: state.transactions,
            totals: totals,
            dispatch,

        }}>{props.children}</BudgetContext.Provider>
    )
}

export default BudgetContextProvider
