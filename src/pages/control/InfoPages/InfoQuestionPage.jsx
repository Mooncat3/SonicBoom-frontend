import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import classes from "./InfoAlbumPage.module.css";
import { NavLink } from "react-router-dom";

export const InfoQuestionPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { data } = useOutletContext(); // Извлекаем данные из контекста Outlet

  const questionId = Number(id);

  // Находим альбом с нужным id
  const question = data.questions.find(
    (question) => question.id === questionId
  );

  if (!question) {
    return <h1>Вопрос с ID {id} не найден</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.info_container}>
        <div className={classes.album_info}>
          <span>Автор: {question.author}</span>
          <span>
            Текст вопроса:{" "}
            {question.question_text ? question.question_text : "Не указан"}
          </span>
          <span>Статус: {question.status ? question.status : "Не указан"}</span>
          <span>
            Время создания:{" "}
            {question.created_at ? question.created_at : "Не указана"}
          </span>
        </div>
      </div>
      <div className={classes.btns}>
        <NavLink to={"/control/questions/edit/" + question.id}>
          <button className="edit">Изменить данные</button>
        </NavLink>
        <button className="edit">Удалить</button>
      </div>
    </div>
  );
};
