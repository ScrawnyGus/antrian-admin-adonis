'use strict'

/*
|--------------------------------------------------------------------------
| SubmerchantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Submerchant = use("App/Models/Submerchant");

class SubmerchantSeeder {
  async run() {
    const submerchant1 = new Submerchant();
    submerchant1.id_merchant = "1";
    submerchant1.name = "Pelayanan SIM";
    submerchant1.description = "Melayani berbagai pelayanan surat ijin mengemudi";
    await submerchant1.save();

    const submerchant2 = new Submerchant();
    submerchant2.id_merchant = "1";
    submerchant2.name = "Pelayanan SKCK";
    submerchant2.description = "Melayani berbagai pelayanan surat keterangan catatan kepolisian";
    await submerchant2.save();

    const submerchant3 = new Submerchant();
    submerchant3.id_merchant = "1";
    submerchant3.name = "Pelayanan Tilang";
    submerchant3.description = "Melayani berbagai pelayanan tilang";
    await submerchant3.save();
  }
}

module.exports = SubmerchantSeeder
