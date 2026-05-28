import { useEffect } from "react";

export const useClickOutside = (ref, callback, onBtn = true) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.outerHTML.includes(e.target.outerHTML)) {
      callback();
    }
  };
  const handleBtn = () => {
    if (ref.current) callback();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    if (onBtn && ref.current)
      ref.current.querySelectorAll("button").forEach((element) => {
        element.addEventListener("click", handleBtn);
      });

    return () => {
      document.removeEventListener("mousedown", handleClick);
      if (onBtn && ref.current)
        ref.current.querySelectorAll("button").forEach((element) => {
          element.removeEventListener("click", handleBtn);
        });
    };
  });
};
