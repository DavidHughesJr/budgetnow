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
            case 'ADD RETIREMENT':
                return {
                    ...state,
                    watchList: [...state.retirement, action.payload],
                }
        default: return state
    }
}


const initialState = {
    holdings: [
        { id: uuid(), name: 'Coca-Cola', symbol: 'AMD', shares: 10, avgPrice: 50.00 },
        { id: uuid(), name: 'AMD Tech', symbol: 'KO', shares: 10, avgPrice: 30.00 },
        { id: uuid(), name: 'Coca-Cola', symbol: 'AMD', shares: 10, avgPrice: 50.00 },
        { id: uuid(), name: 'AMD Tech', symbol: 'KO', shares: 10, avgPrice: 30.00 },
        { id: uuid(), name: 'Coca-Cola', symbol: 'AMD', shares: 10, avgPrice: 50.00 },
        { id: uuid(), name: 'AMD Tech', symbol: 'KO', shares: 10, avgPrice: 30.00 },
        { id: uuid(), name: 'Coca-Cola', symbol: 'AMD', shares: 10, avgPrice: 50.00 },
        { id: uuid(), name: 'AMD Tech', symbol: 'KO', shares: 10, avgPrice: 30.00 },
        { id: uuid(), name: 'Coca-Cola', symbol: 'AMD', shares: 10, avgPrice: 50.00 },
        { id: uuid(), name: 'AMD Tech', symbol: 'KO', shares: 10, avgPrice: 30.00 },
    ],
    watchList: [
        { id: uuid(), name: 'Apple', symbol: ' AAPL' }
    ],
    retirement: [
        { id: uuid(), name: 'Fidelity 500 Index Fund', symbol: 'FXAIX' }
    ]
}

export const InvestmentContext = createContext()

const InvestmentContextProvider = (props) => {

    const [state, dispatch] = useReducer(HoldingsReducer, initialState)

    return (
        <InvestmentContext.Provider value={{
            holdings: state.holdings,
            watchList: state.watchList,
            retirement: state.retirement,
            dispatch,
        }}>{props.children}</InvestmentContext.Provider>
    )
}

export default InvestmentContextProvider