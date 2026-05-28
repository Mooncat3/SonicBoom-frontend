import React from "react";
import classes from "./FeedbackQuestion.module.css";

export default function Question({
  author,
  question,
  answer,
  status,
  timestamp,
  authorId, // ID автора вопроса
  currentUser, // Данные текущего пользователя
  onEdit, // Обработчик редактирования
  onDelete, // Обработчик удаления
}) {
  let statusColor = "red";
  if (status === "closed") {
    status = "Закрыт";
    statusColor = "green";
  } else if (status === "open") {
    statusColor = "red";
    status = "Открыт";
  }

  // Форматирование времени
  const formattedTimestamp = new Date(timestamp).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Условие отображения кнопок
  const canEditOrDelete =
    currentUser &&
    (currentUser.id === authorId || currentUser.role === "admin");

  return (
    <div className={classes["question"]}>
      <p>{author}</p>
      <p>{question}</p>
      <p>{answer}</p>
      <span className={classes["status"]} style={{ color: statusColor }}>
        {status}
      </span>
      <p>{formattedTimestamp}</p>

      {/* Кнопки редактирования и удаления */}
      {canEditOrDelete && (
        <div className={classes["buttons"]}>
          <button
            className={classes["edit-btn"]}
            onClick={() => onEdit(question.id)} // Привязка обработчика для редактирования
          >
            Редактировать
          </button>
          <button
            className={classes["delete-btn"]}
            onClick={() => onDelete(question.id)} // Привязка обработчика для удаления
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
