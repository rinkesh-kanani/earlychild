import BaseDBService from './baseDbService';

let singleton;
export class ChildService extends BaseDBService {
  constructor() {
    super('Child');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new ChildService();
    }
    return singleton;
  }

  async getChildDocuments() {
    const snapshot = await this.get();
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }

  async getChildDocumentsOfUser(userId) {
    const snapshot = await this.getByuserId(userId);
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }
}
export default ChildService;
