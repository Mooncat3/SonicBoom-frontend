import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import FormButton from "../../components/Form/FormButton/FormButton";
import ArtistSelector from "../../components/TrackComponents/ArtistSelector";
import classes from "./TrackAdd.module.css";
let inputs = {
  name: {
    inputType: "input",
    label: "Название трека",
    required: true,
    name: "name",
    placeholder: "",
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
  text: {
    inputType: "textArea",
    type: "text",
    label: "Текст песни",
    required: false,
    name: "text",
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
  track: {
    inputType: "fileInput",
    accept: ".mp3",
    label: "Трек",
    required: false,
    name: "track",
    placeholder: "",
    value: "",
  },
};
export default function TrackAdd() {
  const [artists, setArtists] = useState({});
  const [selectedArtist, setSelectedArtist] = useState(0);
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [albums, setAlbums] = useState({});
  const [selectedAlbum, setSelectedALbum] = useState([]);
  const handleArtistChange = (artistId) => {
    setSelectedArtist(parseInt(artistId, 10));
  };
  const handleGenreChange = (genreId) => {
    setSelectedGenre(parseInt(genreId, 10));
  };
  const handleAlbumChange = (albumId) => {
    setSelectedALbum([parseInt(albumId, 10)]);
  };

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
          acc[artist.name] = artist.id;
          return acc;
        }, {});
        setArtists(artistsDict);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error.message);
      });
  }
  function getGenres() {
    const API_URL = "https://sonic-boom.ru/api/genres/";
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
        setGenres(artistsDict);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error.message);
      });
  }
  function getAlbums() {
    const API_URL = "https://sonic-boom.ru/api/albums/";
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
          acc[artist.title] = artist.id; // Ключ — это имя артиста, значение — id
          return acc;
        }, {});
        setAlbums(artistsDict);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error.message);
      });
  }
  useEffect(() => {
    getArtists();
    getGenres();
    getAlbums();
  }, []);

  function trackaddadd(form_data) {
    let cont_data = new FormData();
    for (const [key, value] of Object.entries(form_data)) {
      cont_data.append(key, value);
    }
    cont_data.append("artist", selectedArtist);
    cont_data.append("genre", selectedGenre);
    cont_data.append("album", selectedAlbum);
    cont_data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    fetch("https://sonic-boom.ru/api/songs/", {
      method: "POST",
      body: cont_data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((resp_data) => console.log(resp_data))
      .catch((error) => alert(error));
  }

  return (
    <div className={classes["TrackAddContent"]}>
      <Form
        title="Добавить трек"
        inputs={inputs}
        submitFunction={trackaddadd}
        encType="multipart/form-data"
      >
        <ArtistSelector artists={artists} onChange={handleArtistChange} />
        <ArtistSelector
          artists={genres}
          title="Выберите жанр"
          onChange={handleGenreChange}
        />
        <ArtistSelector
          artists={albums}
          title="Выберите альбом"
          onChange={handleAlbumChange}
        />
        <FormButton title="Сохранить" />
      </Form>
    </div>
  );
}
