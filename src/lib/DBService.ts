import knex from "knex";
import { Model } from "objection";

class DBService {
  async insertData<T extends Model>(
    model: typeof Model,
    data: any
  ): Promise<any> {
    try {
      return await model.query().insert(data);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export default new DBService();
