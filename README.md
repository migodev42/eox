# eox
react state management based on basic hooks api.

> e -> leo  o -> hooks x -> redux
## install
```
yarn add eox
npm install eox
```
## example

* `init` 

``` 
/* context.js */
import { createProvider, combineReducers } from 'eox';

const initState = {
    a: 1,
    b: 100,
}

const reducers = combineReducers({
    a: (state, action) => {
        const { type, data } = action
        switch (type) {
            case 'addA':
                return state + 1;
            default:
                return state;

        }
    },
    b: (state, action) => {
        const { type, data } = action
        switch (type) {
            case 'addB':
                return state + 1;
            default:
                return state;

        }
    },
})

const { Provider, Context } = createProvider(reducers, initState);

export {
    Provider,
    Context,
}
```

* `use` 

``` 
/* App.js */
import React from 'react';
import { Provider } from 'context.js'

const App = () => {
    return (
        <Provider>
            <Child />
        </Provider>
    )
}

/* Child.js */
import React, { useContext } from 'react';
import { Context } from 'context.js'

const Child = () => {
    const { state, dispatch } = useContext(Context)
    return (
        <div>
            a:{state.a}
            b:{state.b}
            <button onClick={()=>dispatch({ type: 'addA' })}>add a</button>
        </div>
    )
}
```
