import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ControlList } from "../../components/control/ControlList/ControlList";
import { SearchBar } from "../../components/control/ControlSearch/SearchBar";
import { AddButton } from "../../components/control/AddBtn/AddBtn";

export default function GenresControl() {
  const { data } = useOutletContext();
  const genres = data.genres || [];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchQuery) return genres;
    return genres.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [genres, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <AddButton to="/control/genres/add" label="Добавить жанр" />
      <ControlList results={filteredResults} page={"genres"} />
    </div>
  );
}
