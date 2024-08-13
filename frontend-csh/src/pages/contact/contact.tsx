import {ReactNode, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Stack} from "@mui/joy";
import {Controller} from "../../controller/controller.ts";
import {toast} from "react-toastify";

import "./contact.css";

const supportMail = import.meta.env.VITE_EXTRANET_CSH_SUPPORT_EMAIL;

const Contact = (): ReactNode => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [emptyError, setEmptyError] = useState(false);
    const [sendCooldown, setSendCooldown] = useState(false);

    const sendMail = useCallback(async () => {
        if (name.length * email.length * subject.length * message.length === 0) {
            setEmptyError(true);
            return;
        }

        setEmptyError(false);
        setSendCooldown(true);

        const newSubject = `Question du site Cercle St-Honoré : ${subject}`;
        const newMessage = `${message}\n\n-- \nCoordonnées de l'envoyeur :\n\t${name}\n\t${email}\n`;


        await toast.promise(Controller.sendMail(supportMail, email, newSubject, newMessage), {
                pending: t("contact.feedback.pending"),
                error: t("contact.feedback.notSent"),
                success: t("contact.feedback.mailSent"),
            }
        ).finally(() => setSendCooldown(false));
    }, [email, message, name, subject, t]);

    return (
        <div className="contact-container">
            <div className="contact-form">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        sendMail();
                    }}
                >
                    <div className="contact-form-wrapper">
                        <Stack spacing={1}>
                            <Input
                                onChange={(event) => setName(event.target.value)}
                                placeholder={t("contact.mailForm.name")}
                                required
                            />
                            <Input
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder={t("contact.mailForm.email")}
                                required
                            />
                            <Input
                                onChange={(event) => setSubject(event.target.value)}
                                placeholder={t("contact.mailForm.subject")}
                                required
                            />
                            <Input
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder={t("contact.mailForm.message")}
                                required
                            />
                            <Button
                                type="submit"
                                disabled={sendCooldown}>{t("contact.mailForm.submit")}
                            </Button>
                        </Stack>
                    </div>
                </form>
                <span className={`contact-feedback ${(emptyError) && 'error'}`}>
                    {emptyError && t("contact.feedback.emptyField")}
                </span>
            </div>
            <div className="contact-details">

            </div>
        </div>
    );
};

export {Contact};
