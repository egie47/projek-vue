import { useState } from "react";
import ButtonCounter from "./CounterButton";

type CounterProps = {
  initialCount: number;
};

const Counter = ({ initialCount }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <h1>{count}</h1>

      <ButtonCounter text="-" eventOnClick={() => setCount(count - 1)} />

      <ButtonCounter text="Reset" eventOnClick={() => setCount(0)} />

      <ButtonCounter text="+" eventOnClick={() => setCount(count + 1)} />
    </div>
  );
};

export default Counter;
