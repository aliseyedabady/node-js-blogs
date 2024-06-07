import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("images", table => {
    table.increments("id").primary();
    table.string("url").notNullable();
    table.string("type").notNullable();
    table.integer("type_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("images");
};
