import { Link } from "react-router-dom";
import classes from "./MainButton.module.css";

export default function MainButton({
  children,
  title,
  onClick,
  to,
  className,
}) {
  return (
    <Link to={to}>
      <button
        title={title ? title : children}
        className={`${classes["main-btn"]} ${className ? className : ""}`}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
}
