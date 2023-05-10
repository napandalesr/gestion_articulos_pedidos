import { Config, httpClient, urlBase } from "../../../Config/HttpClient";
import { type LenguagePorts } from "../../Ports/lenguage.post";
import { type ILenguageResponse } from "./lenguage.model";

export class LenguageRepository implements LenguagePorts {
  async getEnglish (): Promise<ILenguageResponse> {
    return await httpClient().get(`${urlBase}/en`, Config);
  }

  async getSpanish (): Promise<ILenguageResponse> {
    return await httpClient().get(`${urlBase}/es`, Config);
  }
}
