import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('groups', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.boolean('removed').defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('groups');
}
