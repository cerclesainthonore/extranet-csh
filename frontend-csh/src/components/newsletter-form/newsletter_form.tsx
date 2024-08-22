import {ReactNode, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
} from "@mui/joy";
import {Controller} from "../../controller/controller.ts";
import {toast} from "react-toastify";

interface IErrorFeedback {
    data: { response: { data: { code: number } } }
}

const NewsletterForm = (): ReactNode => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [emptyError, setEmptyError] = useState(false);
    const [sendCooldown, setSendCooldown] = useState(false);

    const submit = useCallback(async () => {
        if (name.trim().length * email.trim().length === 0) {
            setEmptyError(true);
            return;
        }

        setEmptyError(false);
        setSendCooldown(true);

        const newPhone = phone.trim().length > 0 ? phone.trim() : undefined;

        await toast.promise(Controller.subscribeToNewsletter(name.trim(), email.trim(), newPhone), {
                pending: t("newsletter.feedback.pending"),
                error: {
                    render({data}: IErrorFeedback) {
                        if (data.response.data.code === 11000) {
                            // duplicate email
                            return t("newsletter.feedback.duplicateMail");
                        }
                        return t("newsletter.feedback.notSent");
                    }
                },
                success: t("newsletter.feedback.success"),
            }
        ).finally(() => setSendCooldown(false))
    }, [email, name, phone, t]);

    return (
        <div className="contact-container">
            <div className="contact-form">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        submit()
                    }}
                >
                    <div className="newsletter-form-title">
                        <span>{t("newsletter.title").toUpperCase()}</span>
                    </div>
                    <div className="newsletter-form-wrapper">
                        <Stack spacing={1}>
                            <FormControl>
                                <FormLabel>{t("newsletter.name")}</FormLabel>
                                <Input
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("newsletter.email")}</FormLabel>
                                <Input
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("newsletter.phone")}</FormLabel>
                                <Input
                                    onChange={(event) => setPhone(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                disabled={sendCooldown}
                                className="newsletter-form-button"
                            >
                                {t("newsletter.submit")}
                            </Button>
                        </Stack>
                    </div>
                </form>
                <span className={`newsletter-feedback ${(emptyError) && 'error'}`}>
                    {emptyError && t("newsletter.feedback.emptyField")}
                </span>
            </div>
        </div>
    );
};

export {NewsletterForm};
