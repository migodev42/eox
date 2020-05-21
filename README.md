# eox
easy react state management based on hooks api.
<!-- > e -> leo  o -> hooks x -> redux -->

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

const Child = ({counta}) => {
    return (
        <div>
            a:{counta}
            <button onClick={()=>dispatch({ type: 'addA' })}>add a</button>
        </div>
    )
}
export default withContext(Child,Contex,{
    dispatch: ctx => ctx.dispatch,
    counta: ctx => ctx.state.a,
})
```

## F&Q

* How to avoid unneccesary re-render?

when a component call `useContext` , every update on `context` will call our component re-render. 
1 Split contexts that don't change together
2 Split your component in two, put `memo` in between
3 One component with `useMemo` inside
[see this issue](https://github.com/facebook/react/issues/15156)
