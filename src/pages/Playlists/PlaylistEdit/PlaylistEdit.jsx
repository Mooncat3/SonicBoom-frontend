import { useEffect } from "react";
import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import Loading from "../../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PlaylistAdd({ user }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setId] = useState(-1);
  const [inputs, setInputs] = useState({});
  const url = `https://sonic-boom.ru/api/playlists/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://sonic-boom.ru/api/playlists/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        // setId(response_data.id);
        setInputs({
          title: {
            inputType: "input",
            label: "Название плейлиста",
            required: true,
            name: "title",
            value: response_data.title,
          },
          picture: {
            inputType: "fileInput",
            label: "Обложка",
            required: true,
            accept: ".png, .jpg, .jpeg",
            value: response_data.picture,
            name: "picture",
          },
        });
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  function edit(form_data) {
    console.log(form_data);
    console.log(inputs);
    let patch_data = new FormData();
    for (const [key, value] of Object.entries(form_data)) {
      if (value != inputs[key].value) patch_data.append(key, value);
    }
    console.log("Прошли проверку");
    if (patch_data) {
      console.log("Прошли проверку 2");
      fetch(url, {
        method: "PATCH",
        body: patch_data,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((resp_data) => {
          console.log(resp_data);
          let url = "/playlist/" + id;
          navigate(url);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Изменить плейлист"
        inputs={inputs}
        submitFunction={edit}
        encType="multipart/form-data"
      >
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
