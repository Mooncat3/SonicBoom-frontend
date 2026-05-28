import React, { useRef } from "react";
import classes from "./FileInput.module.css";
import inputClasses from "../Input/Input.module.css";
export default function Mp3UploadButton({
  savePath,
  label,
  error,
  value,
  setError,
  setData,
  ...props
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError(event.target.name, "Пожалуйста, выберите MP3 файл.");
      setData(props.name, "");
      return;
    }
    // Проверка, является ли файл MP3
    const accept = event.target.accept.split(",").map((type) => type.trim());
    const fileExstension = "." + file.name.split(".").pop().toLowerCase();
    console.log(accept);
    console.log(fileExstension);
    if (
      file &&
      (accept.includes(fileExstension) || accept.includes(file.type))
    ) {
      const formData = new FormData();
      formData.append("file", file); // Добавляем файл в FormData
      setError(event.target.name, "");
      setData(props.name, event.target.files[0]);
      // value = file;
    } else {
      setError(event.target.name, "Пожалуйста, выберите MP3 файл.");
      setData(props.name, "");
      return;
    }
  };

  return (
    <div className={classes["main-div-mp3"]}>
      <label className={inputClasses.flabel}>{label}</label>
      <button
        onClick={handleButtonClick}
        className={classes["mp3-button-loader"]}
        type="button"
      >
        <i className="fa-solid fa-cloud-arrow-up"></i>
        <span>Выбрать файл</span>

        <input
          type="file"
          id={props.name}
          {...props}
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </button>
      <p className={inputClasses.errors}>{error}</p>
    </div>
  );
}
