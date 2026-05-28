import Form from "../../../components/Form/Form";
import FormButton from "../../../components/Form/FormButton/FormButton";

const url = "https://sonic-boom.ru/api/artists/";

function artistadd(form_data) {
  const new_data = {
    name: form_data.name,
    biography: form_data.biography,
  };

  if (form_data.picture && form_data.picture !== "") {
    new_data.picture = form_data.picture;
  }
  const post_data = JSON.stringify(new_data);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: post_data,
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || "Network response was not ok");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Произошла ошибка: " + error.message);
    });
}
let inputs = {
  name: {
    inputType: "input",
    type: "text",
    label: "Имя исполнителя",
    required: true,
    name: "name",
    placeholder: "",
    value: "",
  },
  biography: {
    inputType: "textArea",
    type: "text",
    label: "Краткая биография",
    required: false,
    name: "biography",
    placeholder: "",
    value: "",
  },
  picture: {
    inputType: "fileInput",
    accept: ".png, .jpg, .jpeg, .webp",
    label: "Фотография",
    required: false,
    name: "picture",
    placeholder: "",
    value: "",
  },
};

export default function ArtistAdd() {
  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Добавить исполнителя"
        inputs={inputs}
        submitFunction={artistadd}
      >
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
