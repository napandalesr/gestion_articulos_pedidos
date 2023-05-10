import { type ILenguageResponse } from "../Repositories/LenguagesRepository/lenguage.model";

export interface LenguagePorts {
  getEnglish: () => Promise<ILenguageResponse>
  getSpanish: () => Promise<ILenguageResponse>
}
