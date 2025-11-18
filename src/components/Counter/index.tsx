// src/components/Counter/index.tsx
"use client";

import { useCounter } from "@/hooks/useCounter";

export const Counter = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <button
        className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white"
        onClick={decrement}
      >
        -
      </button>
      <span className="mx-4 mt-4 text-center text-xl font-bold">{count}</span>

      <button
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
        onClick={increment}
      >
        +
      </button>
      <div>
        <button
          className="mt-4 rounded bg-gray-300 px-4 py-2 text-black"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
