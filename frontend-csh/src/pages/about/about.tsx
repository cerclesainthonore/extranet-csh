import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

const About = (): ReactNode => {
  const {t} = useTranslation();

  return (
      <div id="about">
        {t("about")}
      </div>
  );
};

export {About}
