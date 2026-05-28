import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import track_pic from "../../assets/images/track_pic.png";
import albumCov1 from "../../assets/images/album_cov1.png";
import albumCov2 from "../../assets/images/album_cov2.png";
import PlaylistList from "../../components/PlayListComponents/PlaylistList/PlaylistList"; // Импортируем PlaylistList
import TrackItem from "../../components/TrackComponents/TrackItem"; // Импортируем TrackItem

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const [originalTracks, setOriginalTracks] = useState([]);
  const [originalPlaylists, setOriginalPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для получения всех данных
  const fetchData = async () => {
    try {
      const [albumsResponse, tracksResponse, playlistsResponse] =
        await Promise.all([
          fetch("https://sonic-boom.ru/api/albums/", {
            credentials: "include",
          }),
          fetch("https://sonic-boom.ru/api/songs/", { credentials: "include" }),
          fetch("https://sonic-boom.ru/api/playlists/", {
            credentials: "include",
          }),
        ]);

      if (!albumsResponse.ok || !tracksResponse.ok || !playlistsResponse.ok) {
        throw new Error("Ошибка при получении данных");
      }

      const [albumsData, tracksData, playlistsData] = await Promise.all([
        albumsResponse.json(),
        tracksResponse.json(),
        playlistsResponse.json(),
      ]);

      setAlbums(albumsData);
      setOriginalAlbums(albumsData); // Сохраняем оригинальные данные для фильтрации
      setTracks(tracksData);
      setOriginalTracks(tracksData); // Сохраняем оригинальные данные для фильтрации
      setPlaylists(playlistsData);
      setOriginalPlaylists(playlistsData); // Сохраняем оригинальные данные для фильтрации
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Функция фильтрации
  const handleFilter = (query) => {
    if (query.trim() === "") {
      // Если запрос пустой, восстанавливаем оригинальные данные
      setAlbums(originalAlbums);
      setTracks(originalTracks);
      setPlaylists(originalPlaylists);
    } else {
      const filteredAlbums = originalAlbums.filter((album) =>
        album.name.toLowerCase().includes(query.toLowerCase())
      );
      const filteredTracks = originalTracks.filter((track) =>
        track.name.toLowerCase().includes(query.toLowerCase())
      );
      const filteredPlaylists = originalPlaylists.filter((playlist) =>
        playlist.name.toLowerCase().includes(query.toLowerCase())
      );

      setAlbums(filteredAlbums);
      setTracks(filteredTracks);
      setPlaylists(filteredPlaylists);
    }
  };

  useEffect(() => {
    handleFilter(query); // Применяем фильтрацию при загрузке страницы
  }, [query]);

  const handleShowAllClick = () => {
    navigate(`/search?query=${query}`);
  };

  return (
    <div>
      <h1>Результаты поиска для: "{query}"</h1>
      {isLoading && <p>Загрузка...</p>} {/* Индикатор загрузки */}
      {error && <p>Произошла ошибка: {error}</p>} {/* Ошибка при загрузке */}
      {/* Отображаем треки */}
      <div>
        <div className="section-header">
          <span>Треки</span>
          <button className="show-all-button" onClick={handleShowAllClick}>
            Показать все...
          </button>
        </div>

        {tracks.length === 0 ? (
          <p>Нет треков</p>
        ) : (
          <div className="track-list-wrapper">
            <div className="track-list">
              {tracks.map((track) => (
                <TrackItem
                  key={track.id}
                  icon={`https://sonic-boom.ru${track.picture}`} // Используем изображение трека
                  title={track.name} // Название трека
                  description={track.description} // Описание трека (если есть)
                  artist={track.artist ? track.artist.name : "Неизвестен"} // Имя исполнителя, если есть
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Отображаем альбомы */}
      <div>
        <div className="section-header">
          <span>Альбомы</span>
          <button className="show-all-button" onClick={handleShowAllClick}>
            Показать все...
          </button>
        </div>

        {albums.length === 0 ? (
          <p>Нет альбомов</p>
        ) : (
          <div className="album-list">
            {albums.map((album) => (
              <div key={album.id} className="album-item">
                <img
                  src={`https://sonic-boom.ru${album.cover}`}
                  alt={album.name}
                />
                <p>{album.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Отображаем плейлисты */}
      <div>
        <div className="section-header">
          <span>Плейлисты</span>
          <button className="show-all-button" onClick={handleShowAllClick}>
            Показать все...
          </button>
        </div>

        {playlists.length === 0 ? (
          <p>Нет плейлистов</p>
        ) : (
          <PlaylistList playlists={playlists} /> // Используем компонент PlaylistList для отображения плейлистов
        )}
      </div>
    </div>
  );
}
