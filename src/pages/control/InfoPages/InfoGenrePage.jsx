import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";

const BASE_URL = "https://sonic-boom.ru";

export const InfoGenrePage = () => {
  const { id } = useParams(); // Получаем ID жанра из URL
  const navigate = useNavigate(); // Для перенаправления
  const { data, setData } = useOutletContext(); // Данные и функция обновления жанров из контекста
  const genres = data.genres || [];
  const genreId = Number(id);

  // Находим жанр с нужным ID
  const genre = data.genres.find((genre) => genre.id === genreId);

  const [updatedGenres, setUpdatedGenres] = useState(genres);

  // Если жанр не найден, отображаем сообщение
  if (!genre) {
    return <h1>Жанр с ID {id} не найден</h1>;
  }

  // Обработчик удаления жанра
  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот жанр?")) {
      fetch(`${BASE_URL}/api/genres/${genreId}`, {
        method: "DELETE",
        credentials: "include", // Отправляем куки для авторизации
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка при удалении жанра");
          }
          // Убираем удалённый жанр из локального состояния
          setData((prevData) => ({
            ...prevData,
            genres: prevData.genres.filter((genre) => genre.id !== genreId), // Фильтруем жанр по id
          }));
          // Перенаправляем на страницу со списком жанров
          navigate("/control/genres");
        })
        .catch((error) => {
          console.error("Ошибка при удалении жанра:", error);
        });
    }
  };

  const updateGenre = (updatedGenre) => {
    // Обновите список жанров, например, заменив старый жанр новым
    setUpdatedGenres((prevGenres) =>
      prevGenres.map((genre) =>
        genre.id === updatedGenre.id ? updatedGenre : genre
      )
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.info_container}>
        <p>Название жанра: {genre.name}</p>
      </div>
      <div className={classes.btns}>
        <NavLink to={`/control/genres/edit/${genre.id}`}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};
