/*import {ReactNode, useCallback, useState} from "react";*/
import {useTranslation} from "react-i18next";
/*import {
    Button,
    FormControl,
    FormLabel,
    Input, Option, Select,
    Stack, Textarea,
} from "@mui/joy";
import {Controller} from "../../controller/controller.ts";
import {toast} from "react-toastify";*/

import "./newsletter_form.css";
/*
interface IErrorFeedback {
    data: { response: { data: { code: number } } }
}

const discoveredViaOptions: Array<string> = [
    "wordOfMouth",
    "poster",
    "shop",
    "instagram",
    "youtube",
    "facebook",
    "other"
];

const NewsletterForm = (): ReactNode => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [discoveredVia, setDiscoveredVia] = useState<string | undefined>(undefined);
    const [otherClause, setOtherClause] = useState<string | undefined>(undefined);

    const [emptyError, setEmptyError] = useState(false);
    const [sendCooldown, setSendCooldown] = useState(false);

    const submit = useCallback(async () => {
        if (name.trim().length * email.trim().length === 0 || !discoveredVia) {
            setEmptyError(true);
            return;
        }

        setEmptyError(false);
        setSendCooldown(true);

        const newPhone = phone.trim().length > 0 ? phone.trim() : undefined;
        const newDiscoveredVia = discoveredVia === "other" ? `Autre : ${otherClause}` : discoveredVia;

        await toast.promise(Controller.subscribeToNewsletter(name.trim(), email.trim(), newDiscoveredVia, newPhone), {
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
    }, [discoveredVia, email, name, otherClause, phone, t]);

    return (
        <div className="newsletter-container">
            <div className="newsletter-form">
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
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t("newsletter.discoveredVia.title")}</FormLabel>
                                <Select
                                    required
                                    placeholder={t("newsletter.discoveredVia.options.unspecified")}
                                    value={discoveredVia}
                                    onChange={(_e, value) => setDiscoveredVia(value ?? undefined)}
                                >
                                    {discoveredViaOptions.map((value) =>
                                        <Option value={value}>{t(`newsletter.discoveredVia.options.${value}`)}</Option>
                                    )}
                                </Select>
                                {discoveredVia === "other" &&
                                    <Textarea
                                        className="newsletter-form-other"
                                        onChange={(event) => setOtherClause(event.target.value)}
                                        required={discoveredVia === "other"}
                                        minRows={2}
                                        maxRows={4}
                                    />
                                }
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

export {NewsletterForm};*/

const newsletter_url: string = import.meta.env.VITE_EXTRANET_CSH_NEWSLETTER_URL;

const NewsletterForm = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className="newsletter-container">
                <div className="newsletter-form">
                    <div className="newsletter-form-title">
                        <span>{t("newsletter.title").toUpperCase()}</span>
                    </div>
                    <iframe width="540" height="950"
                            src={newsletter_url}
                            scrolling="auto" style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxWidth: "100%",
                        overflow: "visible",
                    }}></iframe>
                </div>
            </div>
        </>
    )
}

export {NewsletterForm};
