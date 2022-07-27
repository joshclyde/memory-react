import { useState } from "react";

import { Bar } from "@/Bar";

import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Bar />
    </div>
  );
};
