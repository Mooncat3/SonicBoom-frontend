import Form from "../../components/Form/Form";
import FormButton from "../../components/Form/FormButton/FormButton";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import ArtistSelector from "../../components/TrackComponents/ArtistSelector"; // Подключаем компонент

export default function AlbumEdit() {
  const { id } = useParams();
  const [artists, setArtists] = useState({});
  const [wasArtist, setWasArtist] = useState(0);
  const [selectedArtist, setSelectedArtist] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setId] = useState(-1);
  const [inputs, setInputs] = useState({});
  const url = `https://sonic-boom.ru/api/albums/${id}`;
  const navigate = useNavigate();

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

  const handleArtistChange = (artistId) => {
    setSelectedArtist(parseInt(artistId, 10)); // Обновляем ID выбранного артиста
  };

  useEffect(() => {
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        // setId(response_data.id);
        setInputs({
          title: {
            inputType: "input",
            type: "text",
            label: "Название альбома",
            required: true,
            name: "title",
            placeholder: "",
            value: response_data.title,
          },
          description: {
            inputType: "textArea",
            type: "text",
            label: "Описание",
            required: false,
            name: "description",
            placeholder: "",
            value: response_data.description,
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
        setWasArtist(response_data.artist);
      })
      .catch((error) => console.log(error));
    getArtists();
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
    if (wasArtist != selectedArtist && selectedArtist != 0)
      patch_data.append("artist", selectedArtist);
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
          let url = "/album/" + id;
          navigate(url);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div style={{ margin: "auto" }}>
      <Form
        title="Изменить альбом"
        inputs={inputs}
        encType="multipart/form-data"
        submitFunction={edit}
      >
        <ArtistSelector artists={artists} onChange={handleArtistChange} />
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
