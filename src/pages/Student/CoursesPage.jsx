import React from "react";
import classes from "./CoursesPage.module.css";
import { NavBar } from "../../components/support/NavBar";
import CourseCard from "../../components/support/CourseCard";

export default function CoursesPage() {
  const course = {
    title: "Курс",
    description: "Описание курса",
    link: "/course-page", // Ссылка на страницу курса
  };

  return (
    <div className={classes["courses-page"]}>
      <NavBar />
      <main className={classes["content-container"]}>
        <h1>Мои курсы</h1>
        <section className={classes["courses-list"]}>
          <CourseCard
            title={course.title}
            description={course.description}
            link={course.link}
          />
        </section>
        <div className={classes["pagination"]}>
          <button className={classes["pagination-btn"]} disabled>
            &lt;
          </button>
          <button className={classes["pagination-btn"]}>1</button>
          <button className={classes["pagination-btn"]}>2</button>
          <button className={classes["pagination-btn"]}>3</button>
          <button className={classes["pagination-btn"]} disabled>
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
}
