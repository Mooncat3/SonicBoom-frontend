import React from "react";
import classes from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ title, description, link }) {
  const navigate = useNavigate();

  const handleGoToCourse = () => {
    navigate(link); // Переход на страницу курса
  };

  return (
    <div className={classes["course-card"]}>
      <div className={classes["image-placeholder"]}></div>
      <div className={classes["course-details"]}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleGoToCourse} className={classes["go-button"]}>
          Перейти
        </button>
      </div>
    </div>
  );
}
