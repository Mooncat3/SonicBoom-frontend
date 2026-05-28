import React from "react";
import { NavBar } from "../../../components/support/NavBar";
import classes from "./AvailableFunctions.module.css";
import available_functions1 from "../../../assets/images/available_functions1.png";
import available_functions2 from "../../../assets/images/available_functions2.png";
export default function AvailableFunctionsPage() {
  return (
    <div>
      <NavBar />
      <div className={classes["main-conteiner-available-func"]}>
        <div className={classes["main-conteiner-available-func"]}>
          <h2>Создавайте плейлисты</h2>
          <img
            className={classes["available_functions_pics"]}
            src={available_functions1}
          />
          <h2>Добавляйте трека в плейлисты</h2>
          <img
            className={classes["available_functions_pics"]}
            src={available_functions2}
          />
        </div>
      </div>
    </div>
  );
}
