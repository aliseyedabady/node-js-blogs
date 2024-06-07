import { Model } from "objection";

class Image extends Model {
  static get tableName() {
    return "images";
  }
  static get idColumn() {
    return "id";
  }
  id!: number;
  url!: string;
  type!: "category" | "blog";
  type_id!: number;
  created_at!: string;
  updated_at!: string;
}

export default Image;
