import { createContext, useEffect, useReducer, useState } from 'react'
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
            case 'DELETE TRANSACTION':
                return {
                    ...state,
                    transactions: state.transactions.filter((item) => item.id !== action.payload),
                  };
        case 'ADD CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            }
        case 'DELETE CATEGORY':
            return {
                ...state,
                categories: state.categories.filter((item) => item.id !== action.payload),
            };

        default: return state
    }
}



function getInitialState() {
    const initialBudgetState = localStorage.getItem('initialBudgetState')
    return initialBudgetState ? JSON.parse(initialBudgetState) : {
        budget: [
            { name: 'Primary', amount: 0 },
            { name: 'Secondary', amount: 0 },
            { name: 'Long term', amount: 0 },
            { name: 'Short term', amount: 0 }
        ],
        investment: [
            { id: uuid(), name: 'investment', amount: 1000 },
            { id: uuid(), name: 'retirement', amount: 2000 }
        ],
        categories: [
            { id: uuid(), name: 'Groceries', limit: 1000 },
            { id: uuid(), name: 'Utilities', limit: 1000 },
            { id: uuid(), name: 'Transportation', limit: 500 },
            { id: uuid(), name: 'Medical', limit: 500 },
            { id: uuid(), name: 'Retirement', limit: 500 },
            { id: uuid(), name: 'Savings', limit: 100 },
            { id: uuid(), name: 'Investments', limit: 100 },
            { id: uuid(), name: 'Entertainment', limit: 100 },
            { id: uuid(), name: 'Other', limit: 100 },
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
}

export const BudgetContext = createContext()

const BudgetContextProvider = (props) => {

 

    const [initialBudgetState] = useState(getInitialState)
    const [state, dispatch] = useReducer(BudgetReducer, initialBudgetState)


    useEffect(() => {

        localStorage.setItem('initialBudgetState', JSON.stringify(state))
        
    }, [initialBudgetState, state])

  



    const totals = [
        { budget: initialBudgetState.budget.reduce((acc, arr) => acc + arr.amount, 0) },
        { categories: initialBudgetState.categories.reduce((acc, arr) => acc + arr.limit, 0) },
        { transactions: initialBudgetState.transactions.reduce((acc, arr) => acc + arr.cost, 0) }
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
