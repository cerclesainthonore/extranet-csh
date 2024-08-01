import {ReactNode} from "react";
import {Divider, Typography} from "@mui/joy";
import {useTranslation} from "react-i18next";

import "./home.css";

const Home = (): ReactNode => {
    const {t} = useTranslation();

    return (
        <div className="home-container">
            <div className="home-summary-container">
                <Typography className="home-summary">
                    {t("home.summary")}
                </Typography>
                <a href="/about">{t("home.aboutBtn")}</a>
            </div>
            <Divider/>
            <div className="home-conference-container">
                <Typography className="home-conference-title">
                    {t("home.conferenceTitle")}
                </Typography>
            </div>
            <Divider/>
        </div>
    );
};

export {Home};
