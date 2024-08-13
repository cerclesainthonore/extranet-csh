import {ReactNode, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, FormControl, FormLabel, Input, Stack, Textarea} from "@mui/joy";
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


        await toast.promise(Controller.sendMail(supportMail, email, newSubject, newMessage, name), {
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
                    <div className="contact-form-title">
                        <span>{t("contact.title").toUpperCase()}</span>
                    </div>
                    <div className="contact-form-wrapper">
                        <Stack spacing={1}>
                            <FormControl>
                                <FormLabel>{t("contact.mailForm.name")}</FormLabel>
                                <Input
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("contact.mailForm.email")}</FormLabel>
                                <Input
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("contact.mailForm.subject")}</FormLabel>
                                <Input
                                    onChange={(event) => setSubject(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("contact.mailForm.message")}</FormLabel>
                                <Textarea
                                    onChange={(event) => setMessage(event.target.value)}
                                    required
                                    minRows={2}
                                    maxRows={4}
                                />
                            </FormControl>
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
