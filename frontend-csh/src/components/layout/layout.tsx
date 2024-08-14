import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Footer, Navbar} from "..";
import {Outlet} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    const {i18n} = useTranslation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        setInitialized(i18n.isInitialized);
    }, [i18n.isInitialized]);

    return (
        <>
            <style>
                {/* This tag ensures the site is not displayed until all translations have been fetched*/}
                {initialized || ".main-container {display: none}"}
            </style>
            <div className="main-container">
                <Navbar/>
                <div className="main-body">
                    <Outlet/>
                </div>
                <Footer/>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};

export {Layout};
