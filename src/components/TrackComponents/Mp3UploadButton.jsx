import React, { useRef } from "react";
import classes from "./Mp3UploadButton.module.css";
export default function Mp3UploadButton({ savePath, title = "MP3 файл" }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Добавляем файл в FormData

      try {
        const response = await fetch(savePath, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log(
            `Файл ${file.name} успешно сохранен по пути: ${savePath}`
          );
        } else {
          console.error("Ошибка при сохранении файла:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при отправке файла:", error);
      }
    } else {
      alert("Пожалуйста, выберите MP3 файл.");
    }
  };

  return (
    <div className={classes["main-div-mp3"]}>
      <label className={classes["mp3-label-text"]}>{title}</label>
      <button
        onClick={handleButtonClick}
        className={classes["mp3-button-loader"]}
      >
        <i className="fa-solid fa-cloud-arrow-up"></i>
        <span>Выбрать файл</span>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </button>
    </div>
  );
}
