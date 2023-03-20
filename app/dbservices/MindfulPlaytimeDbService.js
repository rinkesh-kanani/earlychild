import BaseDBService from './baseDbService';

let singleton;
export class MindfulPlaytimeService extends BaseDBService {
  constructor() {
    super('MindfulPlaytime');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new MindfulPlaytimeService();
    }
    return singleton;
  }

  async getMindfulPlaytimeDocuments(userId) {
    const snapshot = await this.getByuserId(userId);
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }
}
export default MindfulPlaytimeService;
