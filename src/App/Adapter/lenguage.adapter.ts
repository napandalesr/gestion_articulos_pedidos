import { type LenguagePorts } from "../../AccesData/Ports/lenguage.post";
import { type LenguageDtoResponse } from "../Controller/LenguageController/lenguage.dto";

export class LenguageAdapter {
  constructor (private readonly lenguage: LenguagePorts) {}
  async getEnglish (): Promise<LenguageDtoResponse> {
    return await this.lenguage.getEnglish();
  }

  async getSpanish (): Promise<LenguageDtoResponse> {
    return await this.lenguage.getSpanish();
  }
}
