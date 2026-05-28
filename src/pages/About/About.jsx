import React from "react";
import classes from "../support/AvailableFunctions/AvailableFunctions.module.css";

export default function About() {
  return (
    <div>
      <div className={classes["main-conteiner-available-func"]}>
        <div className={classes["main-conteiner-available-func"]}>
          <h2>О сайте</h2>
          <p>
            Разработчики сайта: Драчев Илья, Ильюков Егор, Майоров Владимир,
            Мензорюс Илья, Фризен Марк
          </p>
        </div>
      </div>
    </div>
  );
}
