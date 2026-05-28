import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ControlList } from "../../components/control/ControlList/ControlList";
import { SearchBar } from "../../components/control/ControlSearch/SearchBar";

export default function QuestionsControl() {
  const { data } = useOutletContext();
  const questions = data.questions || [];

  const [filteredResults, setFilteredResults] = useState(questions);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredResults(questions);
    } else {
      const filtered = questions.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  };

  return (
    <div>
      {/* Поле поиска */}
      <SearchBar onSearch={handleSearch} />
      {/* Отображение результатов поиска */}
      <ControlList results={filteredResults} page={"questions"} />
    </div>
  );
}
