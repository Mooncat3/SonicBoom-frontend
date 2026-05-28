import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading/Loading";

export default function ArtistEdit() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setId] = useState(-1);
  const [inputs, setInputs] = useState({});
  const url = `https://sonic-boom.ru/api/artists/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        // setId(response_data.id);
        setInputs({
          name: {
            inputType: "input",
            type: "text",
            label: "Имя исполнителя",
            required: false,
            name: "name",
            placeholder: "",
            value: response_data.name,
          },
          biography: {
            inputType: "textArea",
            type: "text",
            label: "Краткая биография",
            required: false,
            name: "biography",
            placeholder: "",
            value: response_data.biography,
          },
          picture: {
            inputType: "fileInput",
            accept: ".png, .jpg, .jpeg, .webp",
            label: "Фотография",
            required: false,
            name: "picture",
            placeholder: "",
            value: response_data.picture,
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
          let url = "/artist/" + id;
          navigate(url);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form title="Изменить исполнителя" inputs={inputs} submitFunction={edit}>
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
