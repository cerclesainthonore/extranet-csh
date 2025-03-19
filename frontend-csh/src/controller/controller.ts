import axios from "axios";

interface IConferenceProps {
  _id: string;
  title: string;
  authors: string[];
  date: string;
  tags: string[];
  coverFilename: string | undefined;
}

interface IConferenceDetailProps extends IConferenceProps {
  summary: string;
  link?: string;
}

interface IBannerProps {
  text: string;
  href?: string;
  bannerColor: string;
}

class Controller {
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

  public static async subscribeToNewsletter(name: string, mail: string, discoveredVia: string, phone?: string): Promise<void> {
    return axios.post(Controller.apiUrl + "/newsletter/subscribe", {
      name,
      mail,
      phone,
      discoveredVia
    })
  }

  public static async getAllConferences(): Promise<IConferenceProps[]> {
    const response = await axios.get(Controller.apiUrl + "/conferences");
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  }

  public static async getConferenceDetail(id: string): Promise<IConferenceDetailProps> {
    const response = await axios.get(Controller.apiUrl + "/conferences/" + id);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  }

  public static async getBanner(): Promise<IBannerProps> {
    const response = await axios.get(Controller.apiUrl + "/banner");
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  }
}

export {Controller, type IConferenceProps, type IConferenceDetailProps, type IBannerProps};