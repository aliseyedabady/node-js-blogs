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

  static relationMappings = {
    image: {
      relation: Model.BelongsToOneRelation,
      modelClass: Image,
      join: {
        from: "categories.image_id",
        to: "images.id",
      },
    },
  };
}

export default Category;
