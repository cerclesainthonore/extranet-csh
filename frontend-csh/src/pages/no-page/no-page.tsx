import {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import "./not-found.css";

const NoPage = (): ReactNode => {
  const {t} = useTranslation();

  return (
      <div id="404" className="not-found">
        <h1>{t("notFound.error")}</h1>
        <span>{t("notFound.caption")}</span>
        <br/>
        <br/>
        <a href="/" className="not-found-button">
          <span>{t("notFound.homeButton")?.toUpperCase()}</span>
        </a>
      </div>
  );
};

export {NoPage}
