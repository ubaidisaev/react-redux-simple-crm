import * as React from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";

import "./index.scss";

type HeaderSearchProps = {
  term: string;
  onChange(term: string): void;
};

const HeaderSearch: React.FC<HeaderSearchProps> = ({ term, onChange }) => {
  const [isActive, setIsActive] = React.useState(!!term);
  const ref = React.useRef<HTMLInputElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  let className = "header-components-search";
  let deleteClassName = "header-components-search__delete";
  if (isActive && term)
    deleteClassName += " header-components-search__delete_active";
  if (isActive) className += " header-components-search_active";

  const handleIconClick = () => {
    setIsActive(true);
    if (ref.current) ref.current.focus();
  };

  const handleInputBlur = () => {
    if (!term) setIsActive(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleDeleteClick = () => {
    onChange("");
    setIsActive(false);
  };

  return (
    <div className={className} ref={wrapRef}>
      <div className="header-components-search__inner">
        <CloseIcon className={deleteClassName} onClick={handleDeleteClick} />
        <SearchIcon
          onClick={handleIconClick}
          className="header-components-search__icon"
        />
        <input
          ref={ref}
          type="text"
          name="header-components-search"
          className="header-components-search__input"
          onBlur={handleInputBlur}
          value={term}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
