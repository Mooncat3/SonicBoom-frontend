import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import classes from "./GenreAddPage.module.css";

const BASE_URL = "https://sonic-boom.ru";

export default function GenreAddPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // Для обработки ошибок
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newGenre = { name, description };

    try {
      const response = await fetch(`${BASE_URL}/api/genres/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGenre),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Жанр добавлен:", result);

      // Обновляем состояние
      setData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, result],
      }));

      // Очистка формы
      setName("");
      setDescription("");

      // Перенаправление на список жанров
      navigate("/control/genres");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Добавить жанр</h1>
      {error && <p className={classes.error}>{error}</p>}{" "}
      {/* Отображение ошибок */}
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.inputGroup}>
          <label htmlFor="name">Название жанра:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Добавить жанр
        </button>
      </form>
    </div>
  );
}
