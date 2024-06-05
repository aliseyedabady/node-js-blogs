import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.enum("role", ["admin", "user"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
