import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://sonic-boom.ru";

const UpdateGenreForm = ({ genreId, currentName, setData }) => {
  const [name, setName] = useState(currentName || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdateGenre = async (event) => {
    event.preventDefault();

    const updatedGenre = { name };

    try {
      const response = await fetch(`${BASE_URL}/api/genres/${genreId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGenre),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Жанр обновлён:", result);

      // Обновляем состояние
      setData((prevData) => ({
        ...prevData,
        genres: prevData.genres.map((genre) =>
          genre.id === genreId ? result : genre
        ),
      }));

      // Перенаправляем на страницу со списком жанров
      navigate("/control/genres");
    } catch (err) {
      console.error("Ошибка при обновлении жанра:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleUpdateGenre}>
      <label>
        Новое имя жанра:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Сохранить изменения</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UpdateGenreForm;
