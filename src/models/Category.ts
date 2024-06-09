import { Model } from "objection";
import Image from "./Image";

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

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: Image,
        join: {
          from: "categories.id",
          to: "images.type_id",
        },
      },
    };
  }
}

export default Category;
