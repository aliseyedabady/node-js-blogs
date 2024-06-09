import { Model } from "objection";

class Blog extends Model {
  static get tableName() {
    return "blogs";
  }
  static get idColumn() {
    return "id";
  }
  id!: number;
  title!: string;
  slug!: string;
  category_id!: number;
  description!: string;
  content!: string;
  created_at!: string;
  updated_at!: string;
}

export default Blog;
