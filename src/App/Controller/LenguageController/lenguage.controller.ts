import { LenguageRepository } from '../../../AccesData/Repositories/LenguagesRepository/lenguages.repository';
import { LenguageAdapter } from '../../Adapter/lenguage.adapter';
import { type LenguageDtoResponse } from './lenguage.dto';

export class LenguageController {
  async getEnglish (): Promise<LenguageDtoResponse> {
    const lenguageAdapter = new LenguageAdapter(new LenguageRepository());
    return await lenguageAdapter.getEnglish();
  }

  async getSpanish (): Promise<LenguageDtoResponse> {
    const lenguageAdapter = new LenguageAdapter(new LenguageRepository());
    return await lenguageAdapter.getSpanish();
  }
}
