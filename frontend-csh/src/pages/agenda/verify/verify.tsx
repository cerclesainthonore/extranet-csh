import {ReactNode, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Controller} from "../../../controller/controller.ts";

import "./verify.css";

const Verify = (): ReactNode => {
    const {t} = useTranslation();

    const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("token")) {
            Controller.verifyAgendaReservation(searchParams.get("token") ?? "")
                .then(() => setIsVerified(true))
                .catch(() => setIsVerified(false));
        }
    }, []);

    return (
        <div className="verify">
            {isVerified !== undefined ?? <a href="/" className="verify-button">
                <span>{t("verify.homeButton")?.toUpperCase()}</span>
            </a>}
        </div>

    )
};

export {Verify};