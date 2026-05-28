import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const inputs = {
  title: {
    inputType: "input",
    label: "Название плейлиста",
    required: true,
    name: "title",
  },
  picture: {
    inputType: "fileInput",
    label: "Обложка",
    required: true,
    accept: ".png, .jpg, .jpeg",
    value: "",
    name: "picture",
  },
};

export default function PlaylistAdd({ user }) {
  const [userId, setId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://sonic-boom.ru/api/users/profile/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        setId(response_data.id);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function addPlaylist(form_data) {
    let post_data = new FormData();
    for (const [key, value] of Object.entries(form_data)) {
      post_data.append(key, value);
    }
    console.log(form_data.picture);
    post_data.append("user", userId);
    // post_data = JSON.stringify(post_data);
    fetch("https://sonic-boom.ru/api/playlists/", {
      method: "POST",
      body: post_data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resp_data) => navigate(`/playlist/${resp_data.id}`))
      .catch((error) => alert(error));
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Создать плейлист"
        inputs={inputs}
        submitFunction={addPlaylist}
        encType="multipart/form-data"
      >
        <FormButton title="Создать плейлист" />
      </Form>
    </div>
  );
}
