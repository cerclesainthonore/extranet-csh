import {useTranslation} from "react-i18next";

import "./recommendations.css";

const imagesUrl: string = import.meta.env.VITE_EXTRANET_CSH_IMAGES_URL;

const Recommendations = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className="recommendations-container">
                <span className="recommendations-title">{t("recommendations.title").toUpperCase()}</span>
                <a href={imagesUrl + "/recommendation.png"} download="recommendation_csh">
                    <img
                        src={imagesUrl + "/recommendation.png"}
                        alt={t("recommendations.title")}
                        className="recommandations-image"
                    />
                </a>
            </div>
        </>
    );
}

export {Recommendations};