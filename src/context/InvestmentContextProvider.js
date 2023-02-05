import React, { useEffect, useState } from "react";
import { createContext, useReducer } from "react";
import uuid from "react-uuid";
import { useId } from "react";

const HoldingsReducer = (state, action) => {
  switch (action.type) {
    case "ADD HOLDINGS":
      return {
        ...state,
        holdings: [...state.holdings, action.payload],
      };
    case "DELETE HOLDINGS":
      return {
        ...state,
        holdings: state.holdings.filter(
          (item) => item.id !== action.payload
        ),
      };
      case "EDIT HOLDINGS":
        const newState = state.holdings.filter(
            (item) => item.id !== action.payload.id
          )
        return {
          ...state,
          holdings: [...newState, action.payload]
        };
    case "ADD WATCHLIST":
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
    case "DELETE WATCHLIST":
      return {
        ...state,
        transactions: state.transactions.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "ADD RETIREMENT":
      return {
        ...state,
        watchList: [...state.retirement, action.payload],
      };
    default:
      return state;
  }
};

function getInitialState() {
  const initialInvestmentState = localStorage.getItem("initialInvestmentState");
  return initialInvestmentState
    ? JSON.parse(initialInvestmentState)
    : {
        holdings: [
          {
            id: uuid(),
            name: "Coca-Cola",
            symbol: "KO",
            shares: 10,
            avgPrice: 50.0,
          },
          {
            id: uuid(),
            name: "AMD Tech",
            symbol: "AMD",
            shares: 6,
            avgPrice: 30.0,
          }
        ],
        watchList: [
          { id: uuid(), name: "Apple", symbol: " AAPL" },
          { id: uuid(), name: "Apple", symbol: " AAPL" },
          
        ],
      };
}

export const InvestmentContext = createContext();

const InvestmentContextProvider = (props) => {
  const [initialInvestmentState] = useState(getInitialState);
  const [state, dispatch] = useReducer(HoldingsReducer, initialInvestmentState);

  useEffect(() => {
    localStorage.setItem("initialInvestmentState", JSON.stringify(state));
  }, [initialInvestmentState, state]);

  return (
    <InvestmentContext.Provider
      value={{
        holdings: state.holdings,
        watchList: state.watchList,
        retirement: state.retirement,
        dispatch,
      }}
    >
      {props.children}
    </InvestmentContext.Provider>
  );
};

export default InvestmentContextProvider;
