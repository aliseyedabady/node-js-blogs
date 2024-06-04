import { Model } from "objection";

class User extends Model {
  static get tableName() {
    return "users";
  }

  id!: number;
  name!: string;
  email!: string;
}

export default User;
