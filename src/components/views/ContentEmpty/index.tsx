import * as React from "react";

import './index.scss'

const ContentEmpty: React.FC = () => {
  let className = "not-found-wrapper";
  return (
    <div className={className}>
      <h2 className="not-found-wrapper__title">Ошибка 404</h2>
      <div className="not-found-wrapper__desc">Такой страницы не нашлось</div>
    </div>
  );
};

export default ContentEmpty;
