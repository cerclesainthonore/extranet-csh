import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

import "./footer.css";

const Footer = (): ReactNode => {
  const {t} = useTranslation();

  return (
      <div className="footer-container">
        <span className="footer-text">{t("footer.credits")}</span>
      </div>
  );
};

export {Footer}
