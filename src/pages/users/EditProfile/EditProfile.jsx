import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import UserAvatar from "../../../components/users/UserAvatar/UserAvatar";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import ActionsBlock from "../../../components/ModalWindow/ActionsBlock/ActionsBlock";
import { Link } from "react-router-dom";
import ProfileCard from "../../../components/users/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ChangePassword() {
  const [data, setData] = useState({});
  const [inputs, setInputs] = useState({});
  const [userId, setId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://sonic-boom.ru/api/users/profile/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        setId(response_data.id);
        setInputs({
          email: {
            inputType: "input",
            label: "E-mail*",
            required: true,
            name: "email",
            value: response_data.email,
          },
          username: {
            inputType: "input",
            label: "Никнейм*",
            required: true,
            minLength: 8,
            name: "username",
            value: response_data.username,
          },
        });
      })
      .catch((error) => console.log(error));
  }, []);

  function edit(form_data) {
    let patch_data = {};
    for (let key of Object.keys(form_data)) {
      if (inputs[key] != form_data[key]) {
        patch_data[key] = form_data[key];
      }
    }
    if (Object.keys(patch_data).length > 0) {
      fetch(`https://sonic-boom.ru/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch_data),
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            navigate("/profile");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div style={{ margin: "auto" }}>
      <ProfileCard>
        <UserAvatar />
        <Form
          title=""
          inputs={inputs}
          submitFunction={edit}
          encType="multipart/form-data"
        >
          <FormButton title="Сохранить" />
        </Form>
      </ProfileCard>
    </div>
  );
}
