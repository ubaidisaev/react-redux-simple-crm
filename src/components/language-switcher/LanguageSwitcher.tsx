import * as React from "react";
import { useTranslation } from "react-i18next";

import './index.scss'

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const onLangChange = (l: string) => {
    i18n.changeLanguage(l);
  };

  return (
    <div className="language-switcher">
      <span
        onClick={onLangChange.bind(this, "ru")}
        className={`language-switcher__lang ${
          i18n.language === "ru" ? "language-switcher__lang_active" : ""
        }`}
      >
        RU
      </span>
      <div className="language-switcher__divider"></div>
      <span
        onClick={onLangChange.bind(this, "en")}
        className={`language-switcher__lang ${
          i18n.language === "en" ? "language-switcher__lang_active" : ""
        }`}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageSwitcher;
