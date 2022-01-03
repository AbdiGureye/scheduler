import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [previous, setPrevious] = useState(initial)

  const transition = (nextMode, replace=false) => {
    if(replace) {
      const copyPrevious = [...previous];
      copyPrevious.pop();

      setPrevious(() => [...copyPrevious, nextMode]);
      setMode(nextMode);
    } else {
      setPrevious(prev => [...prev, nextMode]);
      
      setMode(nextMode);
    }
    
  }

  const back = () => {
    if (previous.length <= 1) {
      setMode(initial);
    } else {
      setMode(previous[previous.length - 2]);
      setPrevious(previous.slice(0, -1));
    }
  }

  return { mode, transition, back };
}