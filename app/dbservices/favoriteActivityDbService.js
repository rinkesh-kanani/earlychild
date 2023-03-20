import BaseDBService from './baseDbService';

let singleton;
export class FavoriteActivityService extends BaseDBService {
  constructor() {
    super('FavoriteActivity');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new FavoriteActivityService();
    }
    return singleton;
  }

  async getFavoriteActivityDocuments() {
    const snapshot = await this.get();
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }
}
export default FavoriteActivityService;
