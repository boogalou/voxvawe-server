import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { getFormData } from "./util/getFormData";


const ALBUM_ID = 294442087;

@Injectable()
export class VkService {
  private readonly axiosClient: AxiosInstance;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.axiosClient = axios.create({
      baseURL: "https://api.vk.com/method/",
      params: {
        access_token: configService.get("VK_APP_TOKEN"),
        v: "5.131"
      }

    });
  }


  async uploadImage(files: Express.Multer.File) {
    const fileFormData = getFormData(files);
    const servUrl = await this.axiosClient.get("photos.getWallUploadServer");
    const savedFile = await this.axiosClient.post(servUrl.data.response.upload_url, fileFormData);
    const response: AxiosResponse = await this.axiosClient.get("photos.saveWallPhoto", {
      params: {
        photo: savedFile.data.photo,
        server: savedFile.data.server,
        hash: savedFile.data.hash
      }
    });
    const sizes = response.data.response.map(it => it.sizes);
    const image = sizes.flat(1).filter(it => it.type === 'y');
    return image;
  };


  async uploadVoice(files: Express.Multer.File) {
    const fileFormData = getFormData(files);
    const url = await this.axiosClient.get("docs.getMessagesUploadServer", { params: { type: "audio_message" } });
    const savedFile = await this.axiosClient.post(url.data.response.upload_url, fileFormData);
    const responseVoiceMessage: AxiosResponse = await this.axiosClient.get("docs.save", { params: { file: savedFile.data.file } });

    delete responseVoiceMessage.data["response"]["audio_message"]["id"];
    delete responseVoiceMessage.data["response"]["audio_message"]["owner_id"];
    return responseVoiceMessage.data["response"]["audio_message"];

  };


}