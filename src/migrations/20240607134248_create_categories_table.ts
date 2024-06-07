import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("categories", table => {
    table.increments("id").primary();
    table.string("title").notNullable().unique();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("categories");
};
