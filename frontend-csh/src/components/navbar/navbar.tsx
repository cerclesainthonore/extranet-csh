import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import {Drawer, IconButton, ModalClose} from "@mui/joy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import "./navbar.css";
import {Controller, IBannerProps} from "../../controller/controller.ts";

const parishUrl: string = import.meta.env.VITE_EXTRANET_CSH_PARISH_URL;
const igUrl: string = import.meta.env.VITE_EXTRANET_CSH_INSTAGRAM_URL;
const ytUrl: string = import.meta.env.VITE_EXTRANET_CSH_YOUTUBE_URL;
const fbUrl: string = import.meta.env.VITE_EXTRANET_CSH_FACEBOOK_URL;
const liUrl: string = import.meta.env.VITE_EXTRANET_CSH_LINKEDIN_URL;

const Navbar = (): ReactNode => {
    const {t} = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const [bannerOpen, setBannerOpen] = useState(true);
    const [bannerProps, setBannerProps] = useState<IBannerProps | undefined>(undefined);
    useEffect(() => {
        Controller.getBanner().then((value) => setBannerProps(value));
    }, []);

    // Ferme le menu si la fenêtre est agrandie
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 930) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const NavbarLinks: ReactNode = (
        <>
            <div className="navbar-link-container">
                <a href="/" className="navbar-link">
                    <span>{t("navbar.home")}</span>
                </a>
                <a href="/conferences" className="navbar-link">
                    <span>{t("navbar.conferences")}</span>
                </a>
                <a href="/about" className="navbar-link">
                    <span>{t("navbar.about")}</span>
                </a>
                <a href={parishUrl} target="_blank" className="navbar-link">
                    <span>{t("navbar.parish")}</span>
                </a>
                <a href="/contact" className="navbar-link">
                    <span>{t("navbar.contact")}</span>
                </a>
            </div>
            <div className="navbar-social-container">
                <a href={igUrl} target="_blank" className="navbar-social">
                    <img src="/assets/social/instagram.svg" alt="Instagram" width={25} height={25}/>
                </a>
                <a href={ytUrl} target="_blank" className="navbar-social">
                    <img src="/assets/social/youtube.svg" alt="Youtube" width={25} height={25}/>
                </a>
                <a href={fbUrl} target="_blank" className="navbar-social">
                    <img src="/assets/social/facebook.svg" alt="Facebook" width={25} height={25}/>
                </a>
                <a href={liUrl} target="_blank" className="navbar-social">
                    <img src="/assets/social/linkedin.svg" alt="LinkedIn" width={28} height={28}/>
                </a>
            </div>
        </>
    );

    return (
        <div id="navbar" className="navbar-container">
            <a href="/" className="navbar-logo">
                <img src="/assets/csh_banner_logo.png" alt="Home"/>
            </a>
            <div className="navbar-no-menu">
                {NavbarLinks}
            </div>
            <button className="navbar-menu-button" onClick={() => setMenuOpen(true)}>
                <img src="/assets/menu.svg" alt="Open menu" width={25} height={25}/>
            </button>
            <Drawer className="navbar-menu" open={menuOpen} onClose={() => setMenuOpen(false)} anchor="right">
                <ModalClose className="navbar-menu-close"/>
                {NavbarLinks}
            </Drawer>
            <div className={`banner-container ${bannerProps || "nodisplay"} ${bannerOpen ? "open" : "closed"}`} style={{
                background: `linear-gradient(to bottom, var(--csh-color-1), 40%, ${bannerProps?.bannerColor})`
            }}>
                <a href={bannerProps?.href ?? ""} className={`banner-text ${bannerOpen || "closed"}`}>
                    {bannerProps?.text}
                </a>
                <IconButton className={`banner-close ${bannerOpen ? "open" : "closed"}`} onClick={() => setBannerOpen(!bannerOpen)} variant="plain">
                    <ExpandLessIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export {Navbar}