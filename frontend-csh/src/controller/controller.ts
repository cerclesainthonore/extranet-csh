import axios from "axios";

export class Controller {
  public static apiUrl: string = import.meta.env.VITE_EXTRANET_CSH_API_URL;

  public static async sendMail(to: string, from: string, subject: string, text: string, name: string): Promise<void> {
    return axios.post(Controller.apiUrl + "/send_mail/", {
      to,
      from,
      subject,
      text,
      name
    });
  }

  public static async subscribeToNewsletter(name: string, mail: string, phone?: string): Promise<void> {
    return axios.post(Controller.apiUrl + "/newsletter/subscribe", {
      name,
      mail,
      phone
    })
  }
}