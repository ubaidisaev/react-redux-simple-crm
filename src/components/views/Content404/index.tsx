import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/components/form-elements/button/Button";

import "./index.scss";

const Content404: React.FC = () => {
  const {t} = useTranslation();
  let className = "not-found__wrapper";
  return (
    <div className="not-found">
      <div className={className}>
        <h2 className="not-found-wrapper__title">{t("views.404.title")}</h2>
        <div className="not-found-wrapper__desc">{t("views.404.description")}</div>
        <div className="not-found__btn-wrap">
          <NavLink to="/" className="not-found-wrapper__btn-link">
            <Button color="black-white">{t("views.404.btn")}</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Content404;
