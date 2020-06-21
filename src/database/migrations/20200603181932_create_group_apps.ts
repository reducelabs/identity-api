import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('group_apps', (table) => {
    table.increments('id').primary();
    table.integer('group_id').notNullable().references('id').inTable('groups');
    table.integer('app_id').notNullable().references('id').inTable('apps');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('group_apps');
}
