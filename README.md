# [Eox](https://leoooy.github.io/eoxdoc/)
Easy react state management based on hooks api.

## Installation

``` 
yarn add eox
npm install eox
```

## Documentation
You can find the Eox documentation [on the website](https://leoooy.github.io/eoxdoc/).

## Examples
``` javascript
/* context.js */
const { Provider, Context } = createProvider(reducers, initState);

/* APP.js */
import { Provider } from 'context.js'
const App = () => {
    return (
        <Provider>
            <Child />
        </Provider>
    )
}

/* Child.js */
import { withContext } from 'eox';
import { Context } from 'context.js'
export default withContext(Child,Contex,{
    dispatch: ctx => ctx.dispatch,
    state: ctx => ctx.state,
})
```