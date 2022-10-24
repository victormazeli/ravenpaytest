
exports.up = function(knex, Promise) {
    return knex.schema.createTable("transactions", tbl => {
        tbl.increments("id").unsigned().primary();
        tbl.string("unique_id", 255).notNullable();
        tbl.float("amount")
        tbl.string("type", 255).notNullable();
        tbl.string("recipient_name", 255).notNullable();
        tbl.string("recipient_account_number", 255).notNullable();
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
        tbl.integer("user_id").unsigned().references("users.id");
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('transactions');
};
