import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id_clustered').primary();
    table.uuid('id').unique().notNullable();
    table.string('name').notNullable();
    table.string('username').unique();
    table.string('image_url');
    table.string('email').unique().notNullable();
    table.boolean('email_confirmed').defaultTo(false).notNullable();
    table.string('security_stamp');
    table.string('phone_number');
    table.boolean('phone_number_confirmed').defaultTo(false).notNullable();
    table.boolean('two_factor_enabled').defaultTo(false).notNullable();
    table.timestamp('lockout_end');
    table.boolean('lockout_enabled').defaultTo(false).notNullable();
    table.integer('access_failed_count').defaultTo(0).notNullable();
    table.string('hash').notNullable();
    table.string('salt').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('removed').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
