import { createContext, useReducer } from 'react'
import uuid from 'react-uuid'



const BudgetReducer = (state, action) => {
    switch (action.type) {
        case 'ADD BUDGET':
            return {
                ...state,
                budget: [...state.budget, action.payload].reduce((items, item) => {
                    const { name, amount } = item;
                    const itemIndex = items.findIndex(item => item.name === name)
                    if (itemIndex === -1) {
                        items.push(item);
                    } else {
                        items[itemIndex].amount += amount   
                    }
                    return items
                }, []),
            }
        case 'ADD TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            }
        case 'ADD CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            }
            
        default: return state
    }
}


const initialState = {

    budget: [
        { name: 'Income', amount: 6000 },
        { name: 'Secondary Income', amount: 500 },
        { name: 'Long Term Savings', amount: 1000 },
        { name: 'Short Term Savings', amount: 200 },
    ],
    investment: [
        { id: uuid(), name: 'investment', amount: 1000 },
        { id: uuid(), name: 'retirement', amount: 2000 }
    ],
    categories: [
        { name: 'Groceries', limit: 1000 },
        { name: 'Utilities', limit: 1000 },
        { name: 'Transportation', limit: 500 },
        { name: 'Medical', limit: 500 },
        { name: 'Retirement', limit: 500 },
        { name: 'Savings', limit: 100 },
        { name: 'Investments', limit: 100 },
        { name: 'Entertainment', limit: 100 },
        { name: 'Other', limit: 100 },
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
        { categories: initialState.categories.reduce((acc, arr) => acc + arr.limit, 0) },
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
