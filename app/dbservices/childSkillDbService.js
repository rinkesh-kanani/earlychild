import BaseDBService from './baseDbService';
import firestore from '@react-native-firebase/firestore';

let singleton;
export class ChildSkillService extends BaseDBService {
  constructor() {
    super('ChildSkill');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new ChildSkillService();
    }
    return singleton;
  }

  async getChildSkillDocuments(userId, childId) {
    if (childId) {
      let query = firestore().collection(this.collection);
      query = query.where('uid', '==', userId).where('childId', '==', childId);
      const result = await query.get({ uid: userId });
      if (result) {
        const data = [];
        result.forEach((doc) => {
          const item = this.getDocObject(doc);
          data.push(item);
        });
        return data;
      }
    }
    return undefined;
  }
}
export default ChildSkillService;
