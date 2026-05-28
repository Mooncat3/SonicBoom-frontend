import classes from "./ModalWindow.module.css";
import ProfileCard from "../users/ProfileCard/ProfileCard";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function ModalWindow({ isOpen, setIsOpen, children }) {
  const windowRef = useRef();

  useClickOutside(
    windowRef,
    () => {
      if (isOpen) setIsOpen(false);
    },
    false
  );

  return (
    <div className={`${classes.background} ${isOpen ? classes.active : ""}`}>
      <div className={classes.modal} ref={windowRef}>
        {children}
      </div>
    </div>
  );
}
