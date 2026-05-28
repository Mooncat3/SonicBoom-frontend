import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Form from "../../components/Form/Form";
import FormButton from "../../components/Form/FormButton/FormButton";
import GenreSelector from "../../components/TrackComponents/GenreSelector";
import classes from "./TrackAdd.module.css";
import { forwardRef } from "react";
import Mp3UploadButton from "../../components/TrackComponents/Mp3UploadButton";
export default function TrackEdit({
  track_title = "какое то название",
  track_text = "какой то текст",
  descriptionContent = "какое то описание",
}) {
  const inputs = {
    login: {
      inputType: "input",
      label: "Название трека",
      required: true,
      name: "login",
      placeholder: "",
      value: track_title,
    },
  };
  const TrackInput = ({ title = "Введите текст песни", value, onChange }) => {
    return (
      <div className={classes["conteiner-text-area-track"]}>
        <label className={classes["text-area-track-label"]}>{title}</label>
        <textarea
          id="trackName"
          className={classes["text-area-track-add"]}
          placeholder=""
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  const form_button_title = "Обновить трек";
  const savePath = "../../assets/mp3file-TEST/";
  const textarelabel = "Введите текст трека";
  const genres = ["Панк", "Поп", "Кантри", "Рок"];
  const title = "Редактировать трек";

  return (
    <div className={classes["TrackAddContent"]}>
      <Form
        inputs={inputs}
        title={title}
        children={[
          <GenreSelector genres={genres} />,
          <TrackInput value={track_text} />,
          <TrackInput
            value={descriptionContent}
            title="Введите описание трека"
          />,
          <Mp3UploadButton savePath={savePath} />,
          <Mp3UploadButton savePath={savePath} title="PNG File" />,
          <FormButton title={form_button_title} />,
        ]}
      />
    </div>
  );
}
