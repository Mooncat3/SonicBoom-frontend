import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const inputs = {
  login: {
    inputType: "input",
    label: "Логин или email",
    required: true,
    name: "login",
    placeholder: "",
  },
  password: {
    inputType: "input",
    type: "password",
    label: "Пароль",
    required: true,
    minLength: 8,
    name: "password",
    placeholder: "",
  },
};

const url = "https://sonic-boom.ru/api/genres/";

export default function Login(setUser) {
  function login(form_data) {
    const post_data = JSON.stringify(form_data);
    let tokens = fetch("https://sonic-boom.ru/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: post_data,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((error) => alert(error));
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form title="Авторизация" inputs={inputs} submitFunction={login}>
        <FormButton title="Войти" />
        <p>
          Нет аккаунта?
          <Link to="/registration">
            <span style={{ color: "rgb(4, 124, 162)" }}> Создать аккаунт</span>
          </Link>
        </p>
      </Form>
    </div>
  );
}
