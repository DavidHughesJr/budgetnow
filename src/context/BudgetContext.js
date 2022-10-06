import { createContext, useReducer } from 'react'


const BudgetReducer = (state, action) => {
    switch (action.type) {
        default: return state
    }
}

const initialState = {
    budget: [
        { name: 'income', amount: 6000 },
        { name: 'side hustle', amount: 500 }
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
        { id: 1, category: 'Groceries', name: 'Kroger', cost: 200 },
        { id: 2, category: 'Transportation', name: 'Shell gas', cost: 50 },
        { id: 3, category: 'Insurance', name: 'Blue cross insurance', cost: 250 },
        { id: 4, category: 'Retirement', name: 'Roth IRA', cost: 500 },
        { id: 5, category: 'Savings', name: 'Extra cash', cost: 100 },
        { id: 6, category: 'Entertainment', name: 'Spotify', cost: 10 },
    ]
}


export const BudgetContext = createContext()

const BudgetContextProvider = (props) => {

    const [state, dispatch] = useReducer(BudgetReducer, initialState)

    return (
        <BudgetContext.Provider value={{
            budget: state.budget,
            categories: state.categories,
            transactions: state.transactions,
            dispatch
        }}>{props.children}</BudgetContext.Provider>
    )
}

export default BudgetContextProvider
