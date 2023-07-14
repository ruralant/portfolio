---
title: How to optimise React with useMemo and useCallBack
slug: react-usecallback-usememo
subtitle: How to take advantage of useCallBack and useMemo and when to avoid them
category: front end
tags: [react, hooks, memorisation]
published: true
date: 2022-05-22
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/react-memo.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/react-memo.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/react-memo.jpg?w=1000&h=600&srcset';
</script>

<Image
  wepImage={mainImageWebP}
  jpegImage={mainImage}
  alt='analog camera with pictures'
  width={1000}
  height={600}
  placeholder='blur'
  classes='mt-6 mb-8 rounded-lg drop-shadow-md'
  loading='eager'
  feedImage=true
/>

Memorization in React is a form of caching. The basic idea is that, once a piece of code runs, the output is going to me memorised and, if the same input is provided, the recalculation is avoided and the same outout will be instantly provided. React has a _size 1_ cache, this means that only the most recent input/output is stored.

React has three APIs for memorization: `memo`, `useMemo` and `useCallback`.

### React Memo

React `memo` is a high order component that wraps around a normal component and memorise the rendered output. `memo` will allow React to stop rendering a component if props have not changed.

The following code is a good example why you would use `memo`. If the user clicks on the `+` button, the state of the component will change and that will trigger a re-render. This means that, also the child component (the `Todo` in this case), will re-render, even if it's content hasn't changed.

```jsx
// index.js

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```jsx
// Todos.js

const Todos = ({ todos }) => {
  console.log("child render");
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

**Solution**: wrapping `Todo` component with `memo` will do the trick. In this way, even if the parent component re-rended, the `Todo` component will not as its state didn't change.

```jsx
// Todos.js

import { memo } from "react";

const Todos = ({ todos }) => {
  console.log("child render");
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

The `useCallback` hook returns a memorised function. The hook will only runs if one of the dependencies of the function is updated.

The following scenario is an example when `useCallback` can be useful to prevent an entire component from re-rendering.

```jsx
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```jsx
import { memo } from "react";

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
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

If you consider what we did in the `memo` example above, you might be surprised that the component keep re-rendering even if it is wrapped inside the `memo` high-order component.

The reason for the re-rendering is that the `addTodo` function is recreated every time the component re-render. For this reason, as the function is always a new one, the state of the component `Todo` component is changing and that triggers the re-rended even if wrapped in `memo`.

**Solution**: wrapping the function `addTodo` in a `useCallback` hook, will prevent it from be recreated and, consequently, the component to be re-rendered.

```jsx
// index.js

import { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```jsx
// Todos.js

import { memo } from "react";

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
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
This can be particularly useful in the presence of resource-expensive functions. If the same input is provided, the function will not run and the memorised optput will be returned.

As `useCallback`, the hook only runs if one of the dependencies updates.

In the following example, if the `+` button is pressed, the state will change and this mean that, during the re-rended process, the `expensiveCalculation` will run every time. This will create a delay between the user pressing the button and the UI updated.

```jsx
import { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalculation(count);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
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
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

**Solution**: wrapping the `expensiveCalculation` with `useMemo`, the function will run only exclusively during the first render cycle. After that, if the component re-render, the funtion won't run again making the page much more responsive.

```jsx
import { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
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
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## Conclusion

Memorisation in React can make a real difference in properly implemented. But in this particular case, the cliché _with great power comes great responsibility_ comes handy. Re-renders are not a problem and we shouldn't try to avoid them at all costs. Sometimes the memorisation of values when is not necessary can cause more performance drawbacks that advantages.

So, before you start to wrap all your functions in a `useCallback`, ask yourself if it's really necessary. If the amount of data you're handling tiny and the components are already responding instantly to changes, probably it's not worth to over-complicate things.

Until the next time, keep on coding!
