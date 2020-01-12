"use strict";

const Schema = use("Schema");

class RoleUserTableSchema extends Schema {
  up() {
    this.create("role_user", table => {
      table.increments();
      table
        .integer("role_id")
        .unsigned()
        .index();
      table
        .foreign("role_id")
        .references("id")
        .on("roles")
        .onDelete("cascade");
      table
        .integer("user_id")
        .unsigned()
        .index();
      table
        .foreign("user_id")
        .references("id")
        .on("users")
        .onDelete("cascade");
      table
        .integer("merchant_id")
        .unsigned()
        .index();
      table
        .foreign("merchant_id")
        .references("id")
        .on("merchants")
        .onDelete("cascade");
      table
        .integer("submerchant_id")
        .unsigned()
        .index();
      table
        .foreign("submerchant_id")
        .references("id")
        .on("submerchants")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("role_user");
  }
}

module.exports = RoleUserTableSchema;
