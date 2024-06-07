import { Model } from "objection";

class Category extends Model {
  static get tableName() {
    return "categories";
  }
  static get idColumn() {
    return "id";
  }
  id!: number;
  title!: string;
  created_at!: string;
  updated_at!: string;
}

export default Category;
