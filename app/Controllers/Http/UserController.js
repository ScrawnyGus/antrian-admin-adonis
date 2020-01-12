"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const Role = use("App/Models/Role");

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const token = await auth.attempt(email, password);
    return response.json(token, email, password);
  }

  async register({ request, response }) {
    const { username, email, password } = request.only([
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

    return response.send({ message: "User has been created" });
  }

  async show({ params, response }) {
    const user = await Database
      .from('users')
      .where('users.id', params.id)
      .leftJoin('role_user', 'users.id', 'role_user.user_id')
      .first();
    const res = {
      id: user.user_id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      merchant_id: user.merchant_id,
    };

    return response.json(res);
  }
}

module.exports = UserController;
