import React from "react";
import { NavBar } from "../../../components/support/NavBar";
import track_pic from "../../../assets/images/NavigationUser.png";
import classes from "./SiteNavigation.module.css";
import navigation_pic from "../../../assets/images/navigation_pic.png";
import menu_example from "../../../assets/images/menu_example.png";
export default function SiteNavigationPage() {
  return (
    <div>
      <NavBar />
      <div className={classes["main_conteiner_navigation"]}>
        <h1 className={classes["siteNavigationTitle"]}>Панель навигации</h1>
        <div className={classes["navitation_text"]}>
          Панель навигации предоставляет доступ на следующие страницы: “Мои
          плейлисты”, “Вопросы”. Также в шапке страницы есть кнопка “Поиска” и
          кнопка профиля пользователя
        </div>
        <img className={classes["shapka_pic"]} src={navigation_pic} />
        <div className={classes["profile_navigation_block"]}>
          <div>
            <h2 className={classes["h_margin"]}>Профильная навигация</h2>
            <div>
              При нажатии на изображение профиля пользователя отображается окно
              управления. С помощью него можно перейти в свой профиль,
              посмотреть плейлисты, перейти на страницу вопросов о сайте или
              выйти из профиля.
            </div>
          </div>
          <div>
            <img className={classes["menu_example_pic"]} src={menu_example} />
          </div>
        </div>
      </div>
    </div>
  );
}
