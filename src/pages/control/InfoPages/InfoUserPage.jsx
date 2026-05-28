import { useParams, Outlet, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";
import user_pic from "../../../assets/images/user.jpg";

export const InfoUserPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { data } = useOutletContext(); // Извлекаем данные из контекста Outlet

  const userId = Number(id);

  // Находим альбом с нужным id
  const user = data.users.find((user) => user.id === userId);

  if (!user) {
    return <h1>Пользователь с ID {id} не найден</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.info_container}>
        <img
          src={user.icon ? user.icon : user_pic}
          alt={user.name}
          className={classes.album_logo}
        />
        <div className={classes.album_info}>
          <span>Никнейм: {user.username}</span>
          <span>Email: {user.email ? user.email : "Не указан"}</span>
          <span>Роль: {user.role ? user.role : "Не указана"}</span>
        </div>
      </div>
      <div className={classes.btns}>
        <NavLink to={"/control/users/edit/" + user.id}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit">Удалить</button>
      </div>
    </div>
  );
};
