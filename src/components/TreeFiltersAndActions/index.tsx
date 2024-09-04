import { FC } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import './styles.css'

export const TreeFiltersAndActions: FC = () => {
  return (
    <div className="tree-filters-and-actions">
      <div className="input-wrapper">
        <input type="text" placeholder="Buscar ativo ou local" />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
