import React, { useEffect, useState } from "react";
import { Nav } from "../../components/control/navControl";
import { Outlet } from "react-router-dom";
import classes from "./Control.module.css";

const BASE_URL = "https://sonic-boom.ru";

const navLinks = [
  { id: 1, name: "Пользователи", href: "users" },
  { id: 2, name: "Альбомы", href: "albums" },
  { id: 3, name: "Исполнители", href: "artists" },
  { id: 4, name: "Треки", href: "tracks" },
  { id: 5, name: "Жанры", href: "genres" },
  { id: 6, name: "Вопросы", href: "questions" },
];

export default function Control() {
  const [data, setData] = useState({
    users: [],
    questions: [],
    albums: [],
    artists: [],
    genres: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${BASE_URL}/api/users`, { credentials: "include" }),
          fetch(`${BASE_URL}/api/questions`, { credentials: "include" }),
          fetch(`${BASE_URL}/api/albums`, { credentials: "include" }),
          fetch(`${BASE_URL}/api/artists`, { credentials: "include" }),
          fetch(`${BASE_URL}/api/genres`, { credentials: "include" }),
        ]);

        // Обрабатываем ответы по отдельности
        const [
          usersResponse,
          questionsResponse,
          albumsResponse,
          artistsResponse,
          genresResponse,
        ] = responses;

        if (
          !usersResponse.ok ||
          !questionsResponse.ok ||
          !albumsResponse.ok ||
          !artistsResponse.ok ||
          !genresResponse.ok
        ) {
          throw new Error(
            `Ошибка загрузки данных: ${usersResponse.status}, ${questionsResponse.status}, ${albumsResponse.status}, ${artistsResponse.status}, ${genresResponse}`
          );
        }

        // Конвертируем данные
        const users = await usersResponse.json();
        const questions = await questionsResponse.json();
        const albums = await albumsResponse.json();
        const artists = await artistsResponse.json();
        const genres = await genresResponse.json();

        setData({
          users,
          questions,
          albums,
          artists,
          genres,
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className={classes.container}>
      <Nav links={navLinks} />
      {/* Передаем данные через Outlet */}
      <Outlet context={{ data, setData }} />
    </div>
  );
}
