import { useEffect, useRef } from "react";

export function useCloseWindow(close, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(eve) {
      if (ref.current && !ref.current.contains(eve.target)) close();
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, true);
  }, [close, listenCapturing]);

  return { ref };
}
