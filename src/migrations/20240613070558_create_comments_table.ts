import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comments", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("text").notNullable();
    table
      .integer("parent_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE");
    table
      .integer("blog_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("blogs")
      .onDelete("CASCADE");
    table.enum("status", ["active", "inactive"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("comments");
}
