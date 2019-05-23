---
title: Test Post
date: '2019-05-22'
spoiler: Test Post
---

## Test Post

```jsx{2}
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```