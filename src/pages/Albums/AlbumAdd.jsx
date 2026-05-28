import Form from "../../components/Form/Form";
import { useState, useEffect } from "react";
import classes from "./AlbumAdd.module.css";
import MainButton from "../../components/Header/MainButton/MainButton";
import FormButton from "../../components/Form/FormButton/FormButton";
import ArtistSelector from "../../components/TrackComponents/ArtistSelector"; // Подключаем компонент

let inputs = {
  title: {
    inputType: "input",
    type: "text",
    label: "Название альбома",
    required: true,
    name: "title",
    placeholder: "",
    value: "",
  },
  description: {
    inputType: "textArea",
    type: "text",
    label: "Описание",
    required: false,
    name: "description",
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

export default function AlbumAdd() {
  const [artists, setArtists] = useState({});
  const [selectedArtist, setSelectedArtist] = useState(0); // Состояние для выбранного артиста

  // Функция для получения списка артистов
  function getArtists() {
    const API_URL = "https://sonic-boom.ru/api/artists/";
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const artistsDict = data.reduce((acc, artist) => {
          acc[artist.name] = artist.id; // Ключ — это имя артиста, значение — id
          return acc;
        }, {});
        setArtists(artistsDict);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error.message);
      });
  }

  // Функция для обработки изменения артиста
  const handleArtistChange = (artistId) => {
    setSelectedArtist(parseInt(artistId, 10)); // Обновляем ID выбранного артиста
  };

  // Функция для добавления альбома
  function albumadd(form_data) {
    console.log("Form Data:", form_data);
    console.log("Selected Artist ID:", selectedArtist);
    let cont_data = new FormData();
    for (const [key, value] of Object.entries(form_data)) {
      cont_data.append(key, value);
    }
    cont_data.append("artist", selectedArtist);
    console.log("Отправляемые данные:", cont_data);

    // Выполнение POST-запроса
    fetch("https://sonic-boom.ru/api/albums/", {
      method: "POST",
      body: cont_data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resp_data) => console.log(resp_data))
      .catch((error) => alert(error));
  }

  useEffect(() => {
    getArtists(); // Получаем артистов при монтировании компонента
  }, []);

  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Добавить альбом"
        inputs={inputs}
        submitFunction={albumadd}
        encType="multipart/form-data"
      >
        <ArtistSelector artists={artists} onChange={handleArtistChange} />
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
