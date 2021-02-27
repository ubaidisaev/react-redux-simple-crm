import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { IRootState } from "@/store/interfaces";
import HeaderSearch from "@/components/header-search/HeaderSearch";
import { setSearch } from "@/store/tasks/actions";

function mapStateToProps(state: IRootState) {
  return {
    term: state.task.search,
  };
}

const mapDispatchToProps = { setSearch };

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
type AppProps = {} & ConnectedProps<typeof storeEnhancer>;

const TaskSearch: React.FC<AppProps> = (props) => {
  return <HeaderSearch term={props.term} onChange={props.setSearch} />;
};

export default storeEnhancer(TaskSearch);
