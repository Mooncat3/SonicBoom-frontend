import React, { useState, useEffect } from "react";
import classes from "./Feedback.module.css";
import { NavBar } from "../../../components/support/NavBar";
import { SearchBar } from "../../../components/support/SearchBar";
import FeedbackForm from "../../../components/support/FeedbackForm";
import Question from "../../../components/support/FeedbackQuestion";
import EditQuestionModal from "../../../components/support/EditQuestionModal"; // Модальное окно для редактирования

export default function FeedbackPage() {
  const [questions, setQuestions] = useState([]); // Массив вопросов с ответами
  const [originalQuestions, setOriginalQuestions] = useState([]); // Оригинальные вопросы для фильтрации
  const [answers, setAnswers] = useState([]); // Массив всех ответов
  const [isLoading, setIsLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(null); // Для обработки ошибок
  const [currentUser, setCurrentUser] = useState(null); // Данные текущего пользователя
  const [editQuestionData, setEditQuestionData] = useState(null); // Данные для редактирования вопроса

  // Функция для получения информации о пользователе
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("https://sonic-boom.ru/api/users/profile/", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка при получении данных пользователя: ${response.statusText}`
        );
      }

      const userData = await response.json();
      setCurrentUser(userData); // Сохраняем информацию о текущем пользователе
    } catch (error) {
      setError(error.message);
    }
  };

  // Функция для получения всех вопросов
  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://sonic-boom.ru/api/questions/", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка при получении данных: ${response.statusText}`);
      }

      const questionsData = await response.json();

      const questionsWithDetails = await Promise.all(
        questionsData.map(async (question) => {
          const authorData = await fetchUser(question.author);
          return {
            ...question,
            author: authorData.username, // Добавляем имя автора
            authorId: question.author, // Добавляем ID автора
          };
        })
      );

      setQuestions(questionsWithDetails);
      setOriginalQuestions(questionsWithDetails);

      const allAnswers = await fetchAnswers();
      setAnswers(allAnswers);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для получения информации об авторе вопроса
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(
        `https://sonic-boom.ru/api/users/${userId}/`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Ошибка при получении данных пользователя: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
    }
  };

  // Функция для получения всех ответов
  const fetchAnswers = async () => {
    try {
      const response = await fetch(`https://sonic-boom.ru/api/answers/`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка при получении данных ответов: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  // Функция для удаления вопроса
  const deleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `https://sonic-boom.ru/api/questions/${questionId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка при удалении вопроса: ${response.statusText}`);
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Функция для открытия модального окна редактирования
  const openEditModal = (question) => {
    setEditQuestionData(question); // Открываем модальное окно с текущим вопросом
  };

  const editQuestion = async (questionId, updatedText) => {
    try {
      const response = await fetch(
        `https://sonic-boom.ru/api/questions/${questionId}/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_text: updatedText,
            author: editQuestionData.authorId,
            status: editQuestionData.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка при редактировании вопроса: ${response.statusText}`
        );
      }

      const updatedQuestion = await response.json();

      // Обновляем вопрос в списке
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? { ...question, question_text: updatedQuestion.question_text }
            : question
        )
      );
      setEditQuestionData(null); // Закрываем модальное окно
    } catch (error) {
      setError(error.message);
    }
  };

  // Обработчик отмены редактирования
  const cancelEdit = () => {
    setEditQuestionData(null); // Закрываем модальное окно без изменений
  };

  // Функция для обработки поиска
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setQuestions(originalQuestions); // Если запрос пустой, восстанавливаем оригинальные вопросы
    } else {
      const filtered = originalQuestions.filter(
        (item) => item.question_text.toLowerCase().includes(query.toLowerCase()) // Фильтруем по вопросу
      );
      setQuestions(filtered);
    }
  };

  // Функция для добавления нового вопроса
  const addQuestion = async (newQuestionText) => {
    if (!newQuestionText.trim()) {
      return; // Не добавлять пустые вопросы
    }

    try {
      const response = await fetch("https://sonic-boom.ru/api/questions/", {
        method: "POST",
        credentials: "include", // Для авторизованных пользователей
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_text: newQuestionText,
          author: currentUser.id, // Используем id текущего пользователя
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка при добавлении вопроса: ${response.statusText}`
        );
      }

      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Добавляем новый вопрос в список
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Загружаем вопросы
    fetchCurrentUser(); // Загружаем данные о текущем пользователе
  }, []);

  return (
    <div className={classes["feedback-page"]}>
      <NavBar />
      <main className={classes["content-container"]}>
        <SearchBar onSearch={handleSearch} />
        <FeedbackForm onSubmit={addQuestion} />
        <section className={classes["feedback-list"]}>
          {isLoading ? (
            <div>Загрузка...</div>
          ) : error ? (
            <div>Произошла ошибка: {error}</div>
          ) : (
            questions.map((question, index) => {
              // Сопоставляем ответы с вопросами по id вопроса
              const relatedAnswers = answers.filter(
                (answer) => answer.question === question.id
              );

              return (
                <Question
                  key={index}
                  author={question.author}
                  authorId={question.authorId}
                  currentUser={currentUser}
                  question={question.question_text}
                  status={question.status}
                  timestamp={question.created_at}
                  answer={
                    relatedAnswers.length > 0
                      ? relatedAnswers[0].answer_text
                      : "Ответа нет"
                  }
                  onDelete={() => deleteQuestion(question.id)} // Обработчик для кнопки удаления
                  onEdit={() => openEditModal(question)} // Обработчик для кнопки редактирования
                />
              );
            })
          )}
        </section>
      </main>

      {/* Модальное окно для редактирования вопроса */}
      {editQuestionData && (
        <EditQuestionModal
          question={editQuestionData}
          onSave={editQuestion}
          onCancel={cancelEdit}
        />
      )}
    </div>
  );
}
