import BaseDBService from './baseDbService';
import firestore from '@react-native-firebase/firestore';

let singleton;
export class UserService extends BaseDBService {
  constructor() {
    super('User');
  }
  static getInstance() {
    if (!singleton) {
      singleton = new UserService();
    }
    return singleton;
  }

  async getUserDocuments() {
    const snapshot = await this.get();
    if (snapshot?.length > 0) return snapshot;
    return undefined;
  }

  async getSingleUser(userId) {
    let query = firestore().collection(this.collection);
    query = query.where('uid', '==', userId);

    const snapshot = await query.get();
    if (snapshot) {
      const data = [];
      snapshot.forEach((doc) => {
        const item = this.getDocObject(doc);
        data.push(item);
      });
      if (data?.length === 1) return data?.[0];
      return;
    }
  }
}
export default UserService;
