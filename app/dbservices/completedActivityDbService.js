import BaseDBService from './baseDbService';

let singleton;
export class CompletedActivityService extends BaseDBService {
  constructor() {
    super('CompletedActivity');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new CompletedActivityService();
    }
    return singleton;
  }

  async getCompletedActivityDocuments() {
    const snapshot = await this.get();
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }
}
export default CompletedActivityService;
