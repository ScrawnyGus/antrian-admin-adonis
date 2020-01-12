"use strict";

const Merchant = use("App/Models/Merchant");
const RoleUser = use("App/Models/RoleUser");
const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Database = use("Database");

class MerchantController {
  async index({ response }) {
    let merchants = await Merchant.all();

    return response.json(merchants);
  }

  async store({ request, response }) {
    const merchant = new Merchant();

    merchant.name = request.input("name");
    merchant.address = request.input("address");
    await merchant.save();

    return response.status(201).json(merchant);
  }

  async show({ params, response }) {
    const merchant = await Database
      .table('merchants')
      .select('merchants.id as id', 'merchants.name as name', 'merchants.address as address', 'merchants.deskripsi as deskripsi', 'merchants.gambar as gambar', 'role_user.role_id as role_id', 'role_user.user_id as user_id', 'role_user.merchant_id as merchant_id', 'users.email as email')
      .leftJoin('role_user', 'merchants.id', 'role_user.merchant_id')
      .leftJoin('users', 'role_user.user_id', 'users.id')
      .where('merchants.id', params.id)
      .first()

    return response.json(merchant);
  }

  async update({ params, request, response }) {
    const merchant = await Merchant.find(params.id);
    if (!merchant) {
      return response.status(404).json({ data: "Data not found" });
    }
    merchant.name = request.input("name");
    merchant.address = request.input("address");
    await merchant.save();

    return response.status(200).json(merchant);
  }

  async delete({ params, response }) {
    const merchant = await Merchant.find(params.id);
    if (!merchant) {
      return response.status(404).json({ data: "Data not found" });
    }
    await merchant.delete();

    return response.status(204).json({ data: "Data successfully deleted" });
  }

  async register({ request, response }) {
    const { id, username, email, password } = request.only([
      "id",
      "username",
      "email",
      "password"
    ]);

    const roleMerchant = await Database.from("roles")
      .where("slug", "merchant")
      .first();

    const user = await User.create({
      username,
      email,
      password
    })
    await user.roles().attach([roleMerchant.id])

    const terakhir = await Database.table("users")
      .orderBy('id', 'desc')
      .first();

    await Database
      .table('role_user')
      .where('user_id', terakhir.id)
      .update('merchant_id', id)

    return response.status(201).json(user);
  }
}

module.exports = MerchantController;
