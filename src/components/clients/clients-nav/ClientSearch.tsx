import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { IRootState } from "@/store/interfaces";
import { clientSetSearch } from "@/store/clients/actions";
import { CloseIcon, SearchIcon } from "@/components/icons";

import "./index.scss";

function mapStateToProps(state: IRootState) {
  return {
    term: state.client.search,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clientSetSearch: (term: string) => dispatch(clientSetSearch(term)),
  };
};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

const ClientSearch: React.FC<PropsFromRedux> = ({ term, clientSetSearch }) => {
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
    clientSetSearch(event.target.value);
  };

  const handleDeleteClick = () => {
    clientSetSearch("");
    setIsActive(false);
  };

  return (
    <div className={className} ref={wrapRef}>
      <div className="header-components-search__inner">
        <CloseIcon className={deleteClassName} onClick={handleDeleteClick} />
        <SearchIcon onClick={handleIconClick} className="header-components-search__icon" />
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

export default storeEnhancer(ClientSearch);
