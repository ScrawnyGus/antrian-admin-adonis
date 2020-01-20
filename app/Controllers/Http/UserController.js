"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const Role = use("App/Models/Role");

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    try {
      const token = await auth.attempt(email, password);
      return response.json({ success: true, token }, token, email, password);
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Email dan password tidak cocok',
        error,
      })
    }
  }

  async register({ request, response, auth }) {
    const { username, email, password } = request.only([
      "username",
      "email",
      "password"
    ]);

    // try {
    const roleUser = await Database.from("roles")
      .where("slug", "user")
      .first();

    const user = await User.create({
      username,
      email,
      password
    })

    await user.roles().attach([roleUser.id])

    const token = await auth.generate(user)

    // const getUser = await auth.getUser();

    return response.send({
      success: true,
      message: "User has been created",
      token: token,
      // user: getUser
    });
    // } catch (error) {
    //   return response.status(400).json({
    //     status: 'error',
    //     message: 'There was a problem creating the user, please try again later.',
    //     error: error
    //   })
    // }

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
