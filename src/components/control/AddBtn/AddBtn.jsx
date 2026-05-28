import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./AddBtn.module.css"; // Файл стилей

export const AddButton = ({ to, label = "Добавить" }) => {
  return (
    <Link to={to} className={classes.add_btn}>
      {label}
    </Link>
  );
};
