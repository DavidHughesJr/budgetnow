import React from 'react'
import { createContext, useReducer } from 'react'


const InvestmentReducer = (state, action) => {
    switch (action.type) {
        case 'ADD INVESTMENT':
            return {
                ...state,
                transactions: [...state.investments, action.payload]
            }
        default: return state
    }
}


const initialState = {
    holdings: [
        { name: 'Coca-Cola', symbol: 'KO' },
    ],
    watchList: [
        { name: 'Apple', symbol: ' AAPL'}
    ]
}

export const InvestmentContext = createContext()

const InvestmentContextProvider = (props) => {

    const [state, dispatch] = useReducer(InvestmentReducer, initialState)


  return (
      <InvestmentContext.Provider value={{
          holdings: state.holdings,
          watchList: state.watchList,
          dispatch,
      }}>{props.children}</InvestmentContext.Provider>
  )
}

export default InvestmentContextProvider