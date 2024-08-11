import {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import "./wip.css";

const Wip = (): ReactNode => {
    const {t} = useTranslation();

    return (
        <div className="wip">
            <img src="/assets/wip.svg" alt="Page en cours de maintenance" className="wip-image"/>
            <h1>{t("wip.wip")}</h1>
            <span>{t("wip.caption")}</span>
            <br/>
            <br/>
            <a href="/" className="wip-button">
                <span>{t("wip.homeButton")?.toUpperCase()}</span>
            </a>
        </div>
    );
};

export {Wip}
