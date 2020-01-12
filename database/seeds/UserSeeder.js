"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");
const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Database = use("Database");

class UserSeeder {
  async run() {
    const roleUser = await Database.from("roles")
      .where("slug", "user")
      .first();
    const roleMerchant = await Database.from("roles")
      .where("slug", "merchant")
      .first();
    const roleSubmerchant = await Database.from("roles")
      .where("slug", "submerchant")
      .first();
    const roleSuperAdmin = await Database.from("roles")
      .where("slug", "superadmin")
      .first();

    const user = new User();
    user.username = "Darma Wiryanata";
    user.email = "darmawiryanata@gmail.com";
    user.password = "12345678";
    await user.save();
    await user.roles().attach([roleSuperAdmin.id]);
  }
}

module.exports = UserSeeder;
