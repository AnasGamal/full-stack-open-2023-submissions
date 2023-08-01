import { useState } from "react"

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <div>
        <button onClick={() => setCount(count + 1)}>plus</button>
        <button onClick={() => setCount(count - 1)}>minus</button>
        <button onClick={() => setCount(0)}>zero</button>
      </div>
    </div>
  );
}

export default App;
