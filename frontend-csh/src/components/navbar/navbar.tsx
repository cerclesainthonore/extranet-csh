import {useTranslation} from "react-i18next";
import {useCallback, useMemo, ReactNode} from "react";
import styles from "./navbar.module.css";
import {Dropdown} from "../dropdown/dropdown.tsx";

const parishUrl: string = import.meta.env.VITE_EXTRANET_PARISH_URL;
const igUrl: string = import.meta.env.VITE_EXTRANET_INSTAGRAM_URL;
const ytUrl: string = import.meta.env.VITE_EXTRANET_YOUTUBE_URL;

const Navbar = (): ReactNode => {
  const {t, i18n} = useTranslation();

  const languages: Record<string, Record<string, string>> = useMemo(() => {
    return {
      fr: {nativeName: "Français"},
      en: {nativeName: "English"}
    };
  }, []);

  /**
   * Switches language if selected exists and is different from the current one
   * @param lng
   */
  const switchLanguage = useCallback((lng: string): void => {
    if (Object.keys(languages).includes(lng) && lng !== i18n.resolvedLanguage) {
      i18n.changeLanguage(lng);
    }
  }, [i18n, languages]);

  return (
      <div id="navbar" className={styles["navbar-container"]}>
        <a href="/" className={styles["navbar-logo"]}>
          <img src="/assets/csh_banner_logo.png" alt="Home"/>
        </a>
        <div className={styles["navbar-link-container"]}>
          <a href="/" className={styles["navbar-link"]}>
            <span>{t("navbar.home")}</span>
          </a>
          <a href="/conferences" className={styles["navbar-link"]}>
            <span>{t("navbar.conferences")}</span>
          </a>
          <Dropdown className={styles["navbar-dropdown"]} title={t("navbar.about")} options={[
            <a href="/about" className={styles["navbar-dropdown-link"]}>
              <span>{t("navbar.aboutCSH")}</span>
            </a>,
            <a href={parishUrl} target="_blank" className={styles["navbar-dropdown-link"]}>
              <span>{t("navbar.parish")}</span>
            </a>,
            <a href={ytUrl} target="_blank" className={styles["navbar-dropdown-link"]}>
              <span>{t("navbar.social.youtube")}</span>
            </a>,
            <a href={igUrl} target="_blank" className={styles["navbar-dropdown-link"]}>
              <span>{t("navbar.social.instagram")}</span>
            </a>
          ]}/>
          <a href="/contact" className={styles["navbar-link"]}>
            <span>{t("navbar.contact")}</span>
          </a>

        </div>
        <div className={styles["navbar-language-container"]}>
          {Object.keys(languages).map((key: string) =>
              <button
                  key={languages[key].nativeName}
                  onClick={() => switchLanguage(key)}
                  className={styles["navbar-language"] + ` ${key === i18n.resolvedLanguage ? styles["navbar-language-selected"] : ""}`}
              >
                <img
                    alt={languages[key].nativeName}
                    src={`/assets/flag/${key}.png`}
                    width={25}
                    height={17}
                />
              </button>
          )}
        </div>
      </div>
  );
}

export {Navbar}