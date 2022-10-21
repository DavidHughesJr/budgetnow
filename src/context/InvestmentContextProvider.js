import React from 'react'
import { createContext, useReducer } from 'react'
import uuid from 'react-uuid'


const HoldingsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD HOLDINGS':
            return {
                ...state,
                holdings: [...state.holdings, action.payload],
            }
        case 'ADD WATCHLIST':
            return {
                ...state,
                watchList: [...state.watchList, action.payload],
            }
        default: return state
    }

}

const initialState = {
    holdings: [
        { id: uuid(), name: 'Coca-Cola', symbol: 'KO', shares: 10, avgPrice: 1.99 },
    ],
    watchList: [
        { id: uuid(), name: 'Apple', symbol: ' AAPL' }
    ],
    retirement: [
        { id: uuid(), name: 'Apple', symbol: ' AAPL' }
    ]
}

export const InvestmentContext = createContext()

const InvestmentContextProvider = (props) => {

    const [state, dispatch] = useReducer(HoldingsReducer, initialState)

    return (
        <InvestmentContext.Provider value={{
            holdings: state.holdings,
            watchList: state.watchList,
            dispatch,
        }}>{props.children}</InvestmentContext.Provider>
    )
}

export default InvestmentContextProvider