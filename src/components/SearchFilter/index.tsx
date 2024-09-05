import { FC, ChangeEvent } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import './styles.css'
import { CloseIcon } from "../icons/CloseIcon";

interface SearchFilterProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

export const SearchFilter: FC<SearchFilterProps> = ({ searchTerm, onSearch, onClear }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-filter">
      <div className="input-wrapper">
        <input
          type="text"
          value={searchTerm}
          placeholder="Buscar ativo ou local"
          onChange={handleChange}
        />
        <button className="search-icon" onClick={onClear}>
          {!searchTerm ? <SearchIcon /> : <CloseIcon />}
        </button>
      </div>
    </div>
  );
};
