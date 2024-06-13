import { Model } from "objection";

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
    };
  }
}

export default Comment;
