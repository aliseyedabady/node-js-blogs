import { Model } from "objection";
import Blog from "./Blog";

class Comment extends Model {
  static get tableName() {
    return "comments";
  }
  static get idColumn() {
    return "id";
  }
  id!: number;
  name!: string;
  email!: string;
  text!: string;
  parent_id!: string;
  blog_id!: string;
  status!: "active" | "inactive";
  created_at!: string;
  updated_at!: string;

  static get relationMappings() {
    return {
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "comments.id",
          to: "comments.parent_id",
        },
      },
      blog: {
        relation: Model.HasOneRelation,
        modelClass: Blog,
        join: {
          from: "comments.blog_id",
          to: "blogs.id",
        },
      },
    };
  }
}

export default Comment;
