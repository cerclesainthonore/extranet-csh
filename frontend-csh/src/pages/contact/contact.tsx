import {ReactNode, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Stack} from "@mui/joy";

const supportMail = import.meta.env.VITE_EXTRANET_CSH_SUPPORT_EMAIL;

const Contact = (): ReactNode => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    /*const [emptyError, setEmptyError] = useState(false);
    const [sendCooldown, setSendCooldown] = useState(false);*/

    const sendMail = useCallback(() => {
        /*if (name.length * email.length * subject.length * message.length === 0) {
          setEmptyError(true);
          return;
        }

        setEmptyError(false);
        setSendCooldown(true);*/

        const newSubject = `Question du site Cercle St-Honoré : ${subject}`;
        const newMessage = `${message}\n\n-- \nCoordonnées de l'envoyeur :\n\t${name}\n\t${email}\n`;

        const isSubject: boolean = subject.length > 0;
        const mailtoUrl = `mailto:${supportMail}${isSubject ? "?subject=" + encodeURIComponent(newSubject) + "&" : "?"}body=${encodeURIComponent(newMessage)}`;

        window.location.href = mailtoUrl;
        console.log(mailtoUrl);

        /*await toast.promise(axios.post(apiUrl + "send_email/", {
          email: email,
          subject: subject,
          message: message
        }), {
          pending: t("contact.feedback.pending"),
          error: t("contact.feedback.notSent"),
          success: t("contact.feedback.mailSent"),
            }
        ).finally(() => setSendCooldown(false));*/
    }, [email, message, name, subject]);

    return (
        <div id="contact">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    sendMail();
                }}
            >
                <Stack spacing={1}>
                    <Input
                        onChange={(event) => setName(event.target.value)}
                        placeholder={t("contact.name")}
                        required
                    />
                    <Input
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={t("contact.email")}
                        required
                    />
                    <Input
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder={t("contact.subject")}
                    />
                    <Input
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder={t("contact.message")}
                        required
                    />
                    <Button type="submit">{t("contact.submit")}</Button>
                </Stack>
            </form>
        </div>
    );
};

export {Contact};
