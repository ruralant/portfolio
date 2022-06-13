---
title: How to optimise React with useMemo and useCallBack
slug: react-usecallback-usememo
subtitle: How to the advantage of useCallBack and useMemo and when to avoid them
category: programming
tags: [react, hooks, memorisation]
published: true
date: 2022-05-22
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/articles/react-memo.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/articles/react-memo.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/articles/react-memo.jpg?w=1000&h=600&srcset';
</script>

<Image
wepImage={mainImageWebP}
jpegImage={mainImage}
alt='analog camera with pictures'
width={1000}
height={600}
placeholder='blur'
classes={'mt-6 mb-8 rounded-lg drop-shadow-md'}
loading='eager'
/>

### React Memo

React `memo` is a high order component that wraps around a normal component and memorise the rendered output. Using `memo` will allow React to stop rendering a component if props have not changed.

```jsx
// index.js

import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['todo 1', 'todo 2']);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
// Todos.js

const Todos = ({ todos }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default Todos;
```

Solution

```jsx
// Todos.js

import { memo } from 'react';

const Todos = ({ todos }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default memo(Todos);
```

### useCallback

The `useCallback` hook returns a memorised function. The hook will only runs if one of the dependencies is updated.
For intensive functions, not having to run them all the time can improve performance.

The following scenario is an example when `useCallback` can be useful to prevent an entire component from re-rendering.

```jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
import { memo } from 'react';

const Todos = ({ todos, addTodo }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default memo(Todos);
```

If you consider what we did before, with `React.memo` you might be surprised that the component keep re-rendering even if we wrapped it inside the `memo` hook.

The reason for the re-rendering is that the `addTodo` function is recreated every time the component re-render. For this reason, as the function is always a new one, the component re-rended even if wrapped in `memo`.

Solution: wrapping the function `addTodo` in a `useCallback` hook, will prevent it from be recreated and, consequently, the component to be re-rendered.

```jsx
// index.js

import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, 'New Todo']);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
// Todos.js

import { memo } from 'react';

const Todos = ({ todos, addTodo }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default memo(Todos);
```

### useMemo

`useMemo` has a similar behavior as `useCallback` but instead of returning a memorised function, it returns a memorised **_value_**.
As `useCallback`, the hook only runs if one of the dependencies updates.

```jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalculation(count);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
import { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
