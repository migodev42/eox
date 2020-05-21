import React, { useReducer, useMemo, useState, createContext, useEffect } from 'react';

export function combineReducers(reducers) {
    return (state = {}, action) => {
        const newState = {};
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}

export function createProvider(reducers, initState) {
    const Context = createContext({})


    return {
        Provider: React.memo(({ children }) => {
            const [state, dispatch] = useReducer(reducers, initState)
            const store = useMemo(() => ({ state, dispatch }), [state]);            
            return <Context.Provider value={store} >
                {children}
            </Context.Provider >
        }),
        Context: Context,
    }
}