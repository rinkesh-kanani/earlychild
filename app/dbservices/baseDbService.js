import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getAuthUser } from '../utils/localStorage';

export default class BaseDBService {
  constructor(collection) {
    this.collection = collection;
  }

  getCollection() {
    return firestore().collection(this.collection);
  }
  async getObject(document) {
    const doc = await document.get();
    return this.getDocObject(doc);
  }

  getDocObject(doc) {
    if (doc) {
      const result = {
        id: doc.id,
        ...doc.data(),
      };
      if (result.created_at) {
        if (result.created_at.toDate) result.created_at = result.created_at.toDate();
        else result.created_at = new Date(result.created_at);
      }
      if (result.updated_at) {
        if (result.updated_at.toDate) result.updated_at = result.updated_at.toDate();
        else result.updated_at = new Date(result.updated_at);
      }
      return result;
    }
    return undefined;
  }

  async get() {
    const authData = await getAuthUser();
    if (authData) {
      const uid = authData?.uid;
      const result = await firestore().collection(this.collection).get({ uid });
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

  async getSingle(id) {
    if (!id) return;

    const result = await firestore().collection(this.collection).doc(id).get();
    if (result) return this.getDocObject(result);
    return undefined;
  }

  async create(userId, payload) {
    if (!payload) return;
    const id = uuidv4();
    const itemPayload = {
      ...payload,
      uid: userId,
      id,
      created_by: userId,
      created_at: new Date(),
    };
    this.removeUndefined(itemPayload);
    await firestore().collection(this.collection).doc(id).set(itemPayload);
    return await this.getSingle(id);
  }

  async update(userId, id, payload) {
    if (!id) throw new Error('Id is required');
    if (!payload) throw new Error('Data is required');

    const itemPayload = {
      ...payload,
      id,
      updated_by: userId,
      updated_at: new Date(),
    };

    this.removeUndefined(itemPayload);
    await firestore().collection(this.collection).doc(id).update(itemPayload);
    return await this.getSingle(id);
  }

  /**
   * @description delete
   */
  async delete(id) {
    await firestore().collection(this.collection).doc(id).delete();
    return true;
  }

  async isExist(id) {
    const result = await firestore().collection(this.collection).doc(id);
    return result.exists;
  }

  async isExistUser(userId) {
    let query = firestore().collection(this.collection);
    query = query.where('uid', '==', userId);

    const snapshot = await query.get({ uid: userId });
    if (snapshot) {
      const data = [];
      snapshot.forEach((doc) => {
        const item = this.getDocObject(doc);
        data.push(item);
      });
      console.log('data', data);
      if (data?.length > 0) return true;
      return false;
    }
  }

  async getByuserId(userId) {
    if (userId) {
      let query = firestore().collection(this.collection);
      query = query.where('uid', '==', userId);

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
  removeUndefined(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === '') delete obj[key];
    });
    return obj;
  }
}
