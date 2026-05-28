import React, { useState } from "react";
import classes from "./EditQuestionModal.module.css"; // Подключение стилей

const EditQuestionModal = ({ question, onSave, onCancel }) => {
  const [newQuestionText, setNewQuestionText] = useState(
    question.question_text
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(question.id, newQuestionText); // передаем новый текст вопроса и его ID
  };

  return (
    <div className={classes.modal}>
      <div className={classes["modal-content"]}>
        {" "}
        {/* Добавлено обертывание для содержимого модального окна */}
        <h2>Редактирование вопроса</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className={classes["text-area"]} // Применяем класс для текстового поля
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            rows="4"
            cols="50"
          />
          <div className={classes.buttons}>
            {" "}
            {/* Оборачиваем кнопки в div с классом */}
            <button type="submit" className={classes["save-button"]}>
              Сохранить
            </button>
            <button
              type="button"
              className={classes["cancel-button"]}
              onClick={onCancel}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionModal;
