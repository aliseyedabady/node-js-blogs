import { Request } from "express";
import { Model } from "objection";

class DBService {
  async insert(model: typeof Model, data: any): Promise<any> {
    try {
      return await model.query().insert(data);
    } catch (error) {
      Promise.reject(error);
    }
  }
  async get({
    model,
    select,
    filters,
    req,
  }: {
    model: typeof Model;
    select?: string[];
    filters?: string[];
    req: Request;
  }) {
    const query = model.query();
    if (select && select.length > 0) {
      query.select(select);
    }
    if (filters && filters.length > 0) {
      filters.forEach(key => {
        query.where(key, "like", `${req.query[key]}`);
      });
    }
    return query;
  }
}

export default new DBService();
