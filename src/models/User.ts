import { Model } from "objection";

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get idColumn() {
    return "id";
  }
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: "admin" | "user";
  created_at!: string;
  updated_at!: string;
}

export default User;
