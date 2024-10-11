import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

import "./legal.css";

const mailDestinations = {
    support: import.meta.env.VITE_EXTRANET_CSH_SUPPORT_EMAIL as string,
    webmaster: import.meta.env.VITE_EXTRANET_CSH_WEBMASTER_EMAIL as string
};

const Legal = (): ReactNode => {
    const {t} = useTranslation();

    return (
        <div className="legal-container">
            <p>
                <span className="legal-title">{t("legal.webmaster.title")}</span>
                <br/>
                {t("legal.webmaster.name")}
                <br/>
                {t("legal.webmaster.mail") + " : "}
                <a href={`mailto:${mailDestinations.webmaster}`}>{mailDestinations.webmaster}</a>
            </p>
            <br/>
            <p>
                <span className="legal-title">{t("legal.support.title")}</span>
                <br/>
                {t("legal.support.name")}
                <br/>
                {t("legal.support.mail") + " : "}
                <a href={`mailto:${mailDestinations.support}`}>{mailDestinations.support}</a>
            </p>
            <br/>
            <p>
                <span className="legal-title">{t("legal.hosting.title")}</span>
                <br/>
                {t("legal.hosting.name")}
                <br/>
                {t("legal.hosting.address")}
                <br/>
                {t("legal.hosting.phone") + " : 09 72 10 10 07"}
                <br/>
                {t("legal.hosting.mail") + " : "}
                <a href="mailto:support@ovh.com">support@ovh.com</a>
            </p>
            <br/>
            <p>
                <span className="legal-title">{t("legal.privacy.title")}</span>
                <br/>
                {t("legal.privacy.description")}
                <br/>
                <p>
                    <br/>
                    <span className="legal-subtitle">{t("legal.controller.title")}</span>
                    <br/>
                    {t("legal.controller.name")}
                    <br/>
                    {t("legal.controller.mail") + " : "}
                    <a href={`mailto:${mailDestinations.support}`}>{mailDestinations.support}</a>
                </p>
            </p>
        </div>
    );
}

export {Legal};