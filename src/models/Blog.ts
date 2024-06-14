import { Model } from "objection";
import Image from "./Image";
import Category from "./Category";
import Comment from "./Comment";
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

  static get relationMappings() {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: "blogs.category_id",
          to: "categories.id",
        },
      },
      image: {
        relation: Model.HasOneRelation,
        modelClass: Image,
        join: {
          from: "blogs.id",
          to: "images.type_id",
          extra: {
            type: "blog",
          },
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "blogs.id",
          to: "comments.blog_id",
        },
      },
    };
  }
}

export default Blog;
