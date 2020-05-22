import React, { useReducer, useState, createContext, useEffect, useMemo, ReactElement, FC } from 'react';

export function combineReducers(reducers) {
    return (state = {}, action) => {
        const newState = {};
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}

type Selector = (context: any) => any;
interface SelectorObject {
    [key: string]: Selector;
}
/* https://github.com/facebook/react/issues/15156 */
export function withContext(
    Component: FC,
    Context: any,
    selectors: SelectorObject,
): FC {
    return (props: any): ReactElement => {
        const Consumer = ({ context }: any): ReactElement => {
            const contextProps = {}
            Object.keys(selectors).forEach(key => {
                contextProps[key] = selectors[key](context)
            })
            return useMemo(
                (): ReactElement => <Component {...props} {...contextProps} />,
                // eslint-disable-next-line react-hooks/exhaustive-deps
                [...Object.values(props), ...Object.values(contextProps)],
            );
        };
        return (
            <Context.Consumer>
                {(context: any): ReactElement => <Consumer context={context} />}
            </Context.Consumer>
        );
    };
};

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