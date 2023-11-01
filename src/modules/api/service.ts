import { ApiRepository } from "./repository";

export class ApiService {
  private readonly apiRepository: ApiRepository;
  constructor() {
    this.apiRepository = new ApiRepository();
  }

  async apiGetAllPropiedades() {
    return await this.apiRepository.ApiGetAllPropiedades();
  }
}
