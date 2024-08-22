import {ReactNode, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
    Textarea
} from "@mui/joy";
import {Controller} from "../../controller/controller.ts";
import {toast} from "react-toastify";

import "./contact.css";

const mailDestinations = {
    support: import.meta.env.VITE_EXTRANET_CSH_SUPPORT_EMAIL as string,
    webmaster: import.meta.env.VITE_EXTRANET_CSH_WEBMASTER_EMAIL as string
};

const Contact = (): ReactNode => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [emptyError, setEmptyError] = useState(false);
    const [sendCooldown, setSendCooldown] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const sendMail = useCallback(async (to: string) => {
        if (name.trim().length * email.trim().length * subject.trim().length * message.trim().length === 0) {
            setEmptyError(true);
            return;
        }

        setEmptyError(false);
        setSendCooldown(true);

        const newSubject = `Question du site Cercle St-Honoré : ${subject.trim()}`;
        const newMessage = `${message.trim()}\n\n-- \nCoordonnées de l'envoyeur :\n\t${name.trim()}\n\t${email.trim()}\n`;

        await toast.promise(Controller.sendMail(to, email.trim(), newSubject, newMessage, name.trim()), {
                pending: t("contact.feedback.pending"),
                error: t("contact.feedback.notSent"),
                success: t("contact.feedback.mailSent"),
            },
            {autoClose: 10000}
        ).finally(() => setSendCooldown(false));
    }, [email, message, name, subject, t]);

    return (
        <div className="contact-container">
            <div className="contact-form">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setModalOpen(true);
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
                                disabled={sendCooldown}
                                className="contact-form-button"
                            >
                                {t("contact.mailForm.submit")}
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
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ModalDialog>
                    <ModalClose />
                    <p>{t("contact.mailForm.modal.title")}</p>
                    <ButtonGroup
                        orientation="vertical"
                    >
                        {Object.keys(mailDestinations).map((key: string) => (
                            <Button onClick={() => {
                                sendMail(mailDestinations[key as keyof typeof mailDestinations]);
                                setModalOpen(false);
                            }}>
                                {t(`contact.mailForm.modal.${key}`)}
                            </Button>
                        ))}
                    </ButtonGroup>
                </ModalDialog>
            </Modal>
        </div>
    );
};

export {Contact};
