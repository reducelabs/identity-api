import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('username')
      .unique()  
      .notNullable();
    table.string('image_url').notNullable();
    table.string('email')
      .unique()
      .notNullable();
    table.boolean('email_confirmed')
      .defaultTo(false)
      .notNullable();
    table.string('security_stamp')
      .notNullable();
    table.string('phone_number');
    table.boolean('phone_number_confirmed')
      .defaultTo(false)
      .notNullable();
    table.boolean('two_factor_enabled')
      .defaultTo(false)
      .notNullable();
    table.timestamp('lockout_end');
    table.boolean('lockout_enabled')
      .defaultTo(false)
      .notNullable();
    table.integer('access_failed_count')
      .defaultTo(0)
      .notNullable();
    table.string('hash').notNullable();
    table.string('salt').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.boolean('removed').defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
