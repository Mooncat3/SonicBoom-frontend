import { useParams, Outlet, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";

export const InfoTrackPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { data } = useOutletContext(); // Извлекаем данные из контекста Outlet

  const trackId = Number(id);

  // Находим альбом с нужным id
  const track = data.tracks.find((track) => track.id === trackId);

  if (!track) {
    return <h1>Трек с ID {id} не найден</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.info_track_container}>
        <div className={classes.track_container}>
          <span>Текст трека:</span>
          <pre className={classes.track_pre}>{track.text}</pre>
        </div>
        <div className={classes.album_info}>
          <span>Название: {track.name}</span>
          <span>
            Исполнитель: {track.performer ? track.performer : "Не указан"}
          </span>
          <span>Жанр: {track.genre ? track.genre : "Не указана"}</span>
          <span>Альбом: {track.album ? track.album : "Не указана"}</span>
        </div>
      </div>
      <div className={classes.btns}>
        <NavLink to={"/control/tracks/edit/" + track.id}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit">Удалить</button>
      </div>
    </div>
  );
};
