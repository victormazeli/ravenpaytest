exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id").unsigned().primary();
    tbl.string("email", 255).notNullable();
    tbl.string("password", 255).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
  }).createTable("accounts", (tbl) => {
    tbl.increments("id").unsigned().primary();
    tbl.string("first_name", 255).notNullable();
    tbl.string("last_name", 255).notNullable();
    tbl.string("phone_number", 255).notNullable();
    tbl.string("account_number", 255).notNullable();
    tbl.string("account_name", 255).notNullable();
    tbl.string("bank_name", 255).notNullable();
    tbl.float("balance");
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.integer("user_id").unsigned().unique().references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users").dropTable("accounts");
};
