---
published: true
featured: true
templateKey: project
date: '2015-06-12'
title: Redux Promise Middleware
description: 'Developing a middleware for Redux.js to handle async operations'
client: Redux
collaborators:
path: redux-promise-middleware
category: Open Source
keywords:
  - open source
  - javascript
  - software
  - redux
  - web apps
  - mobile apps
  - javascript promises
  - optimistic updates
  - asynchronous code
  - javascript async functions
featuredImage: 
externalLink: 'https://github.com/pburtchaell/redux-promise-middleware'
externalLinkDescription: See the project on GitHub
---
When software executes an asynchronous operation (like requesting data from a server), developers update the state when the operation starts, and, again, when the operation eventually finishes. In JavaScript, developers use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), an object that represents the eventual completion of an operation, to handle this.

```js
new Promise((resolve) => {
  // Do some operation that requires time and returns a result...
  const result = doSomething()

  if (result) {
    resolve(result)
  }
}).then((result) => {
  // OK, the operation is done and we have the result!
})
```

Promises always have one of two states: **pending**, which means when the operation is executing; and **settled**, which means the operation is done and the result is available. A promise switches to the settled state either when the operation  succeeds or when it fails. For promises, this is known as **fulfilled** or **rejected**.

## Problem

When developers use promises in software built with [Redux](http://redux.js.org/), they need a way to update the state container (and usually the user interface too) when a promise is pending, and, again, when a promise is settled.

## Example

When the promise is pending, for example, the developer might display a loading spinner in the user interface (UI).

In this example, when the promise is settled, the developer might hide the loading spinner and update the UI with the result. If the promise is fullfilled, they might display the data. On the other hand, if the promise is rejected, they might display an error message.

State management and UI updates like this can be tricky without the help of a middleware.

## Solution

In Redux, **actions** describe changes to the state container. Actions are returned from functions called **action creators**. For more on actions and action creators, see the documentation on [redux.js.org](https://redux.js.org/).

With Redux Promise Middleware, developers can include promises in their actions.

```js
const myAction = () => ({
  type: 'MY_ACTION',
  payload: Promise.resolve(1)
})
```

When a promise is included in an action, the middleware immediately dispatches a **pending action**. This action describes the pending state of the promise and enables the developer to appropriately update the state container.

```js
{
  type: 'MY_ACTION_PENDING'
}
```

The **settled action** is eventually dispatched, either after the promise resolves or after it rejects. If the promise is fulfilled, the payload is the result of the promise.

```js
{
  type: 'MY_ACTION_FULFILLED',
  payload: 1
}
```

On the other hand, if the promise is rejected, the payload is the error result of the promise--and the error property is defined as true.


```js
{
  type: 'MY_ACTION_REJECTED',
  payload: Error(),
  error: true
}
```

## Additional Features

### Optimistic Updates

An optimistic update is when a developer starts some asynchronous operation doesn't wait for the operation to finish before updating the app state. In other words, they immediately switch to the settled state under the assumption that the operation will succeed.

If an asynchronous action is dispatched with data, it is also included in the pending action.

```js
const myAction = () => ({
  type: 'MY_ACTION',
  payload: {
    promise: Promise.resolve(1),
    data: {
      foo: 'foo',
      bar: 'bar',
    },
  },
})
```

This data can be used to optimistically update the Redux state tree.

```js
{
  type: 'MY_ACTION_PENDING',
  payload: {
    foo: 'foo',
    bar: 'bar',
  },
}
```

### Chaining Actions

When combined with [Redux Thunk](https://github.com/gaearon/redux-thunk), the middleware also suports chaining actions. In more complex apps, developers might chain a sequence of actions together.

```js
const myChainOfActions = () => {
  return (dispatch) => {

    return dispatch({
      type: 'FIRST_ACTION',
      payload: Promise.all([
        dispatch({ type: 'SECOND_ACTION' }),
        dispatch({ type: 'THIRD_ACTION' }),
      ]),
    })
  }
}
```

## Conclusion

That's the basics of the middleware! There's a few features I didn't include here; however, those features are included in [the project documentation on GitHub](https://github.com/pburtchaell/redux-promise-middleware/tree/master/docs). If you'd like to the middleware it in one of your Redux apps, [it's available for install via npm](https://www.npmjs.com/package/redux-promise-middleware).
