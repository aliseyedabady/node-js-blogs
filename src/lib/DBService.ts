import { Model } from "objection";

class DBService {
  async insertData(model: typeof Model, data: any): Promise<any> {
    try {
      return await model.query().insert(data);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export default new DBService();
