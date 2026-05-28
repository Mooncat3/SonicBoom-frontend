import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import UserAvatar from "../../../components/users/UserAvatar/UserAvatar";
import ProfileCard from "../../../components/users/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

let inputs = {
  old_password: {
    inputType: "input",
    type: "password",
    label: "Старый пароль",
    required: true,
    name: "old_password",
    placeholder: "",
    value: "",
  },
  new_password1: {
    inputType: "input",
    type: "password",
    label: "Новый пароль",
    required: true,
    minLength: 8,
    name: "new_password1",
    placeholder: "",
    value: "",
  },
  new_password2: {
    inputType: "input",
    type: "password",
    label: "Повторите новый пароль",
    required: true,
    minLength: 8,
    name: "new_password2",
    placeholder: "",
    value: "",
  },
};

export default function ChangePassword() {
  const navigate = useNavigate();
  function change_password(form_data) {
    const post_data = JSON.stringify(form_data);

    fetch(`https://sonic-boom.ru/api/users/change_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: post_data,
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          navigate("/profile");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Сменить пароль"
        inputs={inputs}
        submitFunction={change_password}
      >
        <FormButton title="Сменить пароль" />
      </Form>
    </div>
  );
}
