import classes from "./Header.module.css";
import MainButton from "./MainButton/MainButton";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import logoImg from "../../assets/images/600px-SBMS.webp";
import noAvatarImg from "../../assets/images/noAvatar.webp";
import Logout from "./Logout/Logout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function logout() {
    fetch("https://sonic-boom.ru/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) navigate("/login");
      })
      .catch((error) => alert(error));
  }

  function navButtons() {
    return user.role === "non-auth" ? (
      <>
        <MainButton to="/registration">Регистрация</MainButton>
        <MainButton to="/login">Вход</MainButton>
      </>
    ) : (
      <>
        <MainButton to="/playlists">Мои плейлисты</MainButton>
        {user.role === "admin" && (
          <MainButton to="/control/users">Управление</MainButton>
        )}
        <MainButton to="/feedback">Вопросы</MainButton>
      </>
    );
  }

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`); // Используем navigate вместо history.push
    }
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes["brand-container"]}>
          <img src={logoImg} alt="logo" />
          <p>Sonic BOOM</p>
        </div>
      </Link>

      <div className={classes["search-container"]}>
        <MainButton
          title="Поиск"
          onClick={() => setIsOpenSearch((prev) => !prev)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </MainButton>

        <DropdownMenu isOpen={isOpenSearch} setIsOpen={setIsOpenSearch}>
          <input
            type="text"
            name="search"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние запроса
            onKeyDown={handleSearchSubmit} // Обработчик нажатия клавиши
          />
        </DropdownMenu>
      </div>

      <div className={classes["nav-buttons-container"]}>{navButtons()}</div>

      <div className={classes["bars-container"]}>
        <MainButton
          title="Развернуть список"
          onClick={() => setIsOpenNav((prev) => !prev)}
        >
          <i className="fa-solid fa-bars"></i>
        </MainButton>

        <DropdownMenu
          isOpen={isOpenNav}
          setIsOpen={setIsOpenNav}
          className={classes["header-dropdown-menu"]}
        >
          {navButtons().props.children}
        </DropdownMenu>
      </div>

      {user.type !== "non-auth" && (
        <div className={classes["avatar-container"]}>
          <div className={classes["avatar-wrapper"]}>
            <img
              src={user?.avatar ? user.avatar : noAvatarImg}
              alt="avatar"
              onClick={() => setIsOpenProfile((prev) => !prev)}
              title="Профиль пользователя"
            />
          </div>

          <DropdownMenu
            isOpen={isOpenProfile}
            setIsOpen={setIsOpenProfile}
            className={classes["header-dropdown-menu"]}
          >
            <p>{user?.username ? user.username : ""}</p>
            <MainButton to="/profile">Профиль</MainButton>
            <MainButton to="/available-functions">Поддержка</MainButton>
            <MainButton to="/about">О сайте</MainButton>
            <MainButton className={classes["logout-btn"]} onClick={logout}>
              Выйти
            </MainButton>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
