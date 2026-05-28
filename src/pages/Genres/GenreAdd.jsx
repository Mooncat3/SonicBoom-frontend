import React, { useState, useRef } from "react";
import Form from "../../components/Form/Form";
import FormButton from "../../components/Form/FormButton/FormButton";
import classes from "./GenreAdd.module.css";
export default function GenreAdd() {
  const inputs = {
    name: {
      inputType: "input",
      label: "Название жанра",
      required: true,
      name: "name",
      placeholder: "",
    },
  };

  function create(form_data) {
    const post_data = JSON.stringify(form_data);
    console.log(form_data);
    let tokens = fetch("https://sonic-boom.ru/api/genres/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: post_data,
      credentials: "include",
    })
      .then((response) => alert(response.status))
      .catch((error) => alert(error));
  }

  const form_button_title = "Добавить жанр";
  const title = "Добавить жанр";
  return (
    <div className={classes["GenreAddContent"]}>
      <Form
        inputs={inputs}
        title={title}
        submitFunction={create}
        children={<FormButton title={form_button_title} />}
      />
    </div>
  );
}
