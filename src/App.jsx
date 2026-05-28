import "./styles.css";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feedback from "./pages/support/Feedback/Feedback";
import AvailableFunctions from "./pages/support/AvailableFunctions/AvailableFunctions";
import SiteNavigation from "./pages/support/SiteNavigation/SiteNavigation";

import CoursesPage from "./pages/Student/CoursesPage/";

import About from "./pages/About/About";

import TrackView from "./pages/Tracks/TrackView";
import TrackAdd from "./pages/Tracks/TrackAdd";
import TrackEdit from "./pages/Tracks/TrackEdit";

import AlbumView from "./pages/Albums/AlbumView";
import AlbumAdd from "./pages/Albums/AlbumAdd";
import AlbumEdit from "./pages/Albums/AlbumEdit";

import Search from "./pages/Search/Search";

import GenreAdd from "./pages/Genres/GenreAdd";
import GenreEdit from "./pages/Genres/GenreEdit";

import PlaylistsList from "./pages/Playlists/PlaylistsListView/PlaylistsListView";
import PlaylistAdd from "./pages/Playlists/PlaylistAdd/PlaylistAdd";
import PlaylistEdit from "./pages/Playlists/PlaylistEdit/PlaylistEdit";
import PlaylistView from "./pages/Playlists/PlaylistView/PlaylistView";

import Home from "./pages/Home/Home";

import Login from "./pages/users/Login/Login";
import Registration from "./pages/users/Registration/Registration";

import Profile from "./pages/users/Profile/Profile";
import EditProfile from "./pages/users/EditProfile/EditProfile";
import ChangePassword from "./pages/users/ChangePassword/ChangePassword";

import Control from "./pages/control/control";
import UsersControl from "./pages/control/UsersControl";
import AlbumsControl from "./pages/control/AlbumsControl";
import PerformersControl from "./pages/control/PerformersControl";
import TracksControl from "./pages/control/TracksControl";
import GenresControl from "./pages/control/GenresControl";
import QuestionsControl from "./pages/control/QuestionsControl";

import { InfoUserPage } from "./pages/control/InfoPages/InfoUserPage";
import { InfoAlbumPage } from "./pages/control/InfoPages/InfoAlbumPage";
import { InfoPerformerPage } from "./pages/control/InfoPages/InfoPerformPage";
import { InfoTrackPage } from "./pages/control/InfoPages/InfoTrackPage";
import { InfoGenrePage } from "./pages/control/InfoPages/InfoGenrePage";
import { InfoQuestionPage } from "./pages/control/InfoPages/InfoQuestionPage";

import GenreAddPage from "./pages/control/AddPages/GenreAddPage";

import ArtistAdd from "./pages/Artists/ArtistAdd/ArtistAdd";
import ArtistEdit from "./pages/Artists/ArtistEdit/ArtistEdit";
import ArtistView from "./pages/Artists/ArtistView/ArtistView";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";

export default function App() {
  const [user, setUser] = useState({
    nickname: "Admin",
    type: "admin",
    role: "admin",
    username: "Admin",
    avatar: "https://sonic-boom.ru/sb-test/admin_avatar.jpg",
  });

  const [playerSong, setPlayerSong] = useState({
    isMuted: false,
    isPlaying: false,
    isRepeated: false,
    volume: 100,
    currentTime: 0,
    name: "Track 1",
    artist: "Artist 2",
    file: "https://sonic-boom.ru/sb-test/test1.mp3",
    cover: "https://sonic-boom.ru/sb-test/track1.jpg",
  });

  const updatePlayerSong = (obj) => {
    setPlayerSong((s) => Object.assign({}, s, obj));
  };

  const onSongEnd = () => {
    updatePlayerSong({
      name: "Track 2",
      artist: "Artist 2",
      file: "https://sonic-boom.ru/sb-test/test2.mp3",
      cover: "https://sonic-boom.ru/sb-test/track2.jpg",
    });
  };

  return (
    <Router>
      <div className="wrapper">
        <Header user={user} />

        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="feedback" element={<Feedback />} />
            <Route
              path="available-functions"
              element={<AvailableFunctions />}
            />
            <Route path="site-navigation" element={<SiteNavigation />} />
            <Route path="about" element={<About />} />

            <Route path="login" element={<GuestRoute element={<Login />} />} />
            <Route
              path="registration"
              element={<GuestRoute element={<Registration />} />}
            />

            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="edit-profile"
              element={<PrivateRoute element={<EditProfile />} />}
            ></Route>
            <Route path="change-password" element={<ChangePassword />} />

            <Route path="track/:id" element={<TrackView user={user} />} />
            <Route path="track-add" element={<TrackAdd />}></Route>
            <Route path="track-edit" element={<TrackEdit />}></Route>
            <Route path="artist-add" element={<ArtistAdd />}></Route>
            <Route path="artist-edit/:id" element={<ArtistEdit />}></Route>
            <Route
              path="artist/:id"
              element={<ArtistView user={user} />}
            ></Route>

            <Route path="genre-add" element={<GenreAdd />}></Route>
            <Route path="genre-edit" element={<GenreEdit />}></Route>

            <Route path="album/:id" element={<AlbumView user={user} />} />
            <Route path="album-add" element={<AlbumAdd />} />
            <Route path="album-edit/:id" element={<AlbumEdit />} />
            <Route path="search" element={<Search />} />

            <Route path="playlists" element={<PlaylistsList user={user} />} />
            <Route path="playlist/:id" element={<PlaylistView user={user} />} />
            <Route path="playlist-add" element={<PlaylistAdd user={user} />} />
            <Route
              path="playlist-edit/:id"
              element={<PlaylistEdit user={user} />}
            />

            <Route path="control" element={<Control />}>
              <Route path="users" element={<UsersControl />} />
              <Route path="albums" element={<AlbumsControl />} />
              <Route path="artists" element={<PerformersControl />} />
              <Route path="tracks" element={<TracksControl />} />

              <Route path="coursespage" element={<CoursesPage />} />

              <Route path="genres" element={<GenresControl />} />
              <Route path="questions" element={<QuestionsControl />} />
              <Route path="users/info/:id" element={<InfoUserPage />} />
              <Route path="tracks/info/:id" element={<InfoTrackPage />} />
              <Route path="albums/info/:id" element={<InfoAlbumPage />} />
              <Route path="artists/info/:id" element={<InfoPerformerPage />} />
              <Route path="genres/info/:id" element={<InfoGenrePage />} />
              <Route path="genres/add" element={<GenreAddPage />} />
              <Route path="genres/edit/:id" element={<GenreEdit />} />
              <Route path="questions/info/:id" element={<InfoQuestionPage />} />
            </Route>
          </Routes>
        </div>

        <Player
          song={playerSong}
          updateSong={updatePlayerSong}
          onSongEnd={onSongEnd}
        />
      </div>
    </Router>
  );
}
//            <Route path="album-add" element={<AlbumAdd />} />
