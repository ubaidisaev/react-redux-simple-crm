import * as React from "react";
import { useTranslation,  } from "react-i18next";

import './index.scss'

interface IEmptySearch {
  title: string;
  text: string;
  modifClass?: string;
}

const EmptySearch: React.FC<IEmptySearch> = (props) => {
  const { title, text, modifClass = "" } = props;
  const {t} = useTranslation();
  return (
    <div className={`empty-wrapper ${modifClass}`}>
      <h2 className="empty-wrapper__title">{title}</h2>
      <p className="empty-wrapper__desc">{text}</p>
    </div>
  );
};


export default EmptySearch;