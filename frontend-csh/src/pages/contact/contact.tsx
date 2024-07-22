import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

const Contact = (): ReactNode => {
  const {t} = useTranslation();

  /*const [name, setName] = useState("");
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
    
    setSubject(`Question du site Cercle St-Honoré : ${subject}`);
    setMessage(`${message}\n\n-- \nCoordonnées de l'envoyeur :\n\t${name}\n\t${email}\n`);

    await toast.promise(axios.post(apiUrl + "send_email/", {
      email: email,
      subject: subject,
      message: message
    }), {
      pending: t("contact.feedback.pending"),
      error: t("contact.feedback.notSent"),
      success: t("contact.feedback.mailSent"),
        }
    ).finally(() => setSendCooldown(false));
  }, [email, message, name, subject, t]);*/

  return (
      <div id="contact">
        {t("contact")}
      </div>
  );
};

export {Contact};
