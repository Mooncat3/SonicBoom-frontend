import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import classes from "./Registration.module.css";
import logo from "../../../assets/images/600px-SBMS.webp";

const inputs = {
  login: {
    inputType: "input",
    label: "Логин*",
    required: true,
    name: "login",
    placeholder: "",
  },
  email: {
    inputType: "input",
    label: "E-mail*",
    required: true,
    name: "email",
    placeholder: "",
  },
  username: {
    inputType: "input",
    label: "Никнейм*",
    required: true,
    name: "username",
    placeholder: "",
  },
  password1: {
    inputType: "input",
    type: "password",
    label: "Пароль*",
    required: true,
    minLength: 8,
    name: "password1",
    placeholder: "",
  },
  password2: {
    inputType: "input",
    type: "password",
    label: "Повторите пароль*",
    required: true,
    minLength: 8,
    name: "password2",
    placeholder: "",
  },
};

function registration(data) {
  const post_data = JSON.stringify(data);
  fetch("https://sonic-boom.ru/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: post_data,
  })
    .then((response) => alert(response.status))
    .catch((error) => alert(error));
}

export default function Registration() {
  return (
    <div className={classes.form_wrapper}>
      <Form title="Новый аккаунт" inputs={inputs} submitFunction={registration}>
        <FormButton title="Создать аккаунт" />
      </Form>
      <div className={classes.icon_wrapper}>
        <img src={logo} alt="logo" />
        <h1>Sonic BOOM</h1>
      </div>
    </div>
  );
}
