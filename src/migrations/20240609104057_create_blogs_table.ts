import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("blogs", table => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("slug").notNullable();
    table.string("time").nullable();
    table.integer("category_id").unsigned().notNullable();
    table.string("description").notNullable();
    table.text("content").notNullable();
    table.json("seo");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("blogs");
}
