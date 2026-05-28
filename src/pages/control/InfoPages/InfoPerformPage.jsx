import { useParams, Outlet, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";

const BASE_URL = "https://sonic-boom.ru";

export const InfoPerformerPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { data } = useOutletContext(); // Извлекаем данные из контекста Outlet

  const performerId = Number(id);

  // Находим альбом с нужным id
  const artist = data.artists.find((performer) => performer.id === performerId);

  if (!artist) {
    return <h1>Пользователь с ID {id} не найден</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.info_container}>
        <img
          src={`${BASE_URL}${artist.picture}`}
          alt={artist.name}
          className={classes.album_logo}
        />
        <div className={classes.album_info}>
          <span>Имя: {artist.name}</span>
          <span>
            Краткая биография:{" "}
            {artist.biography ? artist.biography : "Не указана"}
          </span>
        </div>
      </div>
      <div className={classes.btns}>
        <NavLink to={"/control/performers/edit/" + artist.id}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit">Удалить</button>
      </div>
    </div>
  );
};
