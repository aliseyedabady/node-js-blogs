import { Request } from "express";
import { Model } from "objection";

class DBService {
  async insert({
    model,
    data,
  }: {
    model: typeof Model;
    data: any;
  }): Promise<any> {
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
    withRelation,
  }: {
    model: typeof Model;
    select?: string[];
    filters?: string[];
    req: Request;
    withRelation?: string[];
  }) {
    const query = model.query();
    if (select && select.length > 0) {
      query.select(select);
    }
    if (filters && filters.length > 0) {
      filters.forEach(key => {
        if (req.query[key]) {
          query.where(key, "like", `${req.query[key]}`);
        }
      });
    }
    if (withRelation && withRelation.length > 0) {
      query.withGraphFetched(`[${withRelation.join(", ")}]`);
    }
    return query;
  }
  async getById({
    model,
    id,
    withRelation,
  }: {
    model: typeof Model;
    id: string;
    withRelation?: string[];
  }) {
    const query = model.query();
    if (withRelation && withRelation.length > 0) {
      query.withGraphFetched(`[${withRelation.join(", ")}]`);
    }
    return query.findById(id);
  }
  async update({
    model,
    id,
    data,
  }: {
    model: typeof Model;
    id: string;
    data: any;
  }) {
    return model.query().patchAndFetchById(id, data);
  }
  async delete({ model, id }: { model: typeof Model; id: string }) {
    return model.query().deleteById(id);
  }
}

export default new DBService();
