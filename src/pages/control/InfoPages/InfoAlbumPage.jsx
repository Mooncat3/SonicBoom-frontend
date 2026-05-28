import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";

const BASE_URL = "https://sonic-boom.ru";

export const InfoAlbumPage = () => {
  const { id } = useParams(); // Получаем ID альбома из URL
  const navigate = useNavigate(); // Для перенаправления после удаления
  const { data, setAlbums } = useOutletContext(); // Извлекаем данные и функцию для обновления альбомов
  const [artist, setArtist] = useState(null); // Состояние для данных исполнителя

  const albumId = Number(id);

  // Находим альбом с нужным id
  const album = data.albums.find((album) => album.id === albumId);

  // Загружаем исполнителя, если альбом найден
  useEffect(() => {
    if (album && album.artist) {
      fetch(`${BASE_URL}/api/artists/${album.artist}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setArtist(data.name); // Сохраняем имя исполнителя
        })
        .catch((error) => {
          console.error("Ошибка при загрузке исполнителя:", error);
        });
    }
  }, [album]);

  // Обработчик удаления альбома
  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот альбом?")) {
      fetch(`${BASE_URL}/api/albums/${albumId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка при удалении альбома");
          }
          // Обновляем данные альбомов
          setData((prevData) => ({
            ...prevData,
            albums: prevData.albums.filter((album) => album.id !== albumId),
          }));
          // Перенаправляем на список альбомов
          navigate("/control/albums");
        })
        .catch((error) => {
          console.error("Ошибка при удалении альбома:", error);
        });
    }
  };

  if (!album) {
    return <h1>Альбом с ID {id} не найден</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.info_container}>
        <img
          src={`${BASE_URL}${album.picture}`}
          alt={album.picture}
          className={classes.album_logo}
        />
        <div className={classes.album_info}>
          <span>Название: {album.title}</span>
          <span>Исполнитель: {artist ? artist : "Загрузка..."}</span>
          <span>
            Описание: {album.description ? album.description : "Не указано"}
          </span>
        </div>
      </div>
      <div className={classes.btns}>
        <NavLink to={`/control/albums/edit/${album.id}`}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};
