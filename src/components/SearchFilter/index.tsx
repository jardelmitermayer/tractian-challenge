import { FC, ChangeEvent } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import './styles.css'

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchFilter: FC<SearchFilterProps> = ({ onSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-filter">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Buscar ativo ou local"
          onChange={handleChange}
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
