import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

const Conferences = (): ReactNode => {
  const {t} = useTranslation();

  return (
      <div id="conferences">
        {t("conferences")}
      </div>
  );
};

export {Conferences};
