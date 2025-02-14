import {ReactNode} from "react";
import {Divider} from "@mui/joy";
import {useTranslation} from "react-i18next";
import {NewsletterForm} from "../../components";
import {Recommendations} from "../../components/recommendations/recommendations.tsx";

import "./home.css";

const imagesUrl: string = import.meta.env.VITE_EXTRANET_CSH_IMAGES_URL;

const Home = (): ReactNode => {
    const {t} = useTranslation();

    return (
        <div className="home-container">
            <div className="home-summary-container">
                <div className="home-summary">
                    <p>{t("home.title").toUpperCase()}</p>
                </div>
                <a href="/#affiches" className="home-summary-button">{t("home.flyersButton").toUpperCase()}</a>
                <div className="video-wrapper">
                    <video autoPlay muted loop className="home-summary-video">
                        <source src="/assets/videos/stroch.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="home-summary-background-overlay"/>
                <div className="background-video-wrapper">
                    <video autoPlay muted loop className="home-summary-background-video">
                        <source src="/assets/videos/stroch.mp4" type="video/mp4"/>
                    </video>
                </div>
            </div>
            <Divider/>
            <div className="home-flyer-container" id="affiches">
                <div className="home-flyer">
                    <p className="home-flyer-title">{t("home.conferenceTitle").toUpperCase()}</p>
                    <a href={imagesUrl + "/next_conference.png"} download="prochaine_conference_csh">
                        <img
                            src={imagesUrl + "/next_conference.png"}
                            alt={t("home.conferenceTitle")}
                            className="home-flyer-image"
                        />
                    </a>
                </div>
                <div className="home-flyer">
                    <p className="home-flyer-title">{t("home.programTitle").toUpperCase()}</p>
                    <a href={imagesUrl + "/program.png"} download="programme_csh">
                        <img
                            src={imagesUrl + "/program.png"}
                            alt={t("home.programTitle")}
                            className="home-flyer-image"
                        />
                    </a>
                </div>
            </div>
            <Divider/>
            <Recommendations/>
            <Divider/>
            <div className="newsletter-container">
                <NewsletterForm/>
            </div>
        </div>
    );
};

export {Home};
