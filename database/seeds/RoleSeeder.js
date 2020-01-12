'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    const roleUsers = new Role()
    roleUsers.name = 'User'
    roleUsers.slug = 'user'
    roleUsers.description = 'common users'
    await roleUsers.save()

    const roleMerchants = new Role()
    roleMerchants.name = 'Merchant'
    roleMerchants.slug = 'merchant'
    roleMerchants.description = 'manage submerchants account'
    await roleMerchants.save()

    const roleSubmerchants = new Role()
    roleSubmerchants.name = 'Submerchant'
    roleSubmerchants.slug = 'submerchant'
    roleSubmerchants.description = 'manage counter and queue'
    await roleSubmerchants.save()

    const roleSuperAdmin = new Role()
    roleSuperAdmin.name = 'Super Admin'
    roleSuperAdmin.slug = 'superadmin'
    roleSuperAdmin.description = 'manage merchants account'
    await roleSuperAdmin.save()
  }
}

module.exports = RoleSeeder
