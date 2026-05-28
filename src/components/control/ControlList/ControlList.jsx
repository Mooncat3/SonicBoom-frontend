import React from "react";
import { Link } from "react-router-dom";
import classes from "./ControlList.module.css";
import user_pic from "../../../assets/images/user.jpg";

export const ControlList = ({ results, page }) => {
  return (
    <div className={classes.container}>
      <ul className={classes.ul_list}>
        {results.map((result, index) => (
          <li className={classes.li_list} key={index}>
            {/* Отображение изображения */}
            <img
              src={result.icon ? result.icon : user_pic}
              alt={result.name}
              className={classes.icon}
            />

            {/* Отображение имени */}
            <span className={classes.span_name}>
              {result.username
                ? result.username
                : result.name
                ? result.name
                : result.title
                ? result.title
                : result.id}
            </span>

            {/* Ссылка на редактирование */}
            <Link to={`/control/${page}/info/${result.id}`}>
              <span className={classes.span_control}>Редактировать</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
