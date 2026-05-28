import React, { useState } from "react";
import classes from "./ArtistSelector.module.css";
// Импортируем стили для компонента

export default function ArtistSelector({
  artists,
  onChange,
  title = "Выберите исполнителя",
}) {
  const [selectedArtist, setSelectedArtist] = useState("");

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedArtist(selectedId);
    onChange(selectedId); // Передаем выбранный ID родительскому компоненту
  };

  return (
    <div className={classes["main-conteiner-selector"]}>
      <label htmlFor="artist-selector">{title}</label>
      <select
        id="artist-selector"
        value={selectedArtist}
        onChange={handleChange}
      >
        <option value="" disabled>
          {title}
        </option>
        {Object.entries(artists).map(([artistName, artistId]) => (
          <option key={artistId} value={artistId}>
            {artistName}
          </option>
        ))}
      </select>
    </div>
  );
}
