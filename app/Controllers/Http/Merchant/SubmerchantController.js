'use strict'

const Submerchant = use("App/Models/Submerchant");
const RoleUser = use("App/Models/RoleUser");
const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Database = use("Database");

class SubmerchantController {
    async index({ params, response }) {
        let submerchants = await Database
            .from('submerchants')
            .where('id_merchant', params.id);

        return response.json(submerchants);
    }

    async store({ request, response }) {
        const merchant = new Merchant();

        merchant.name = request.input("name");
        merchant.address = request.input("address");
        await merchant.save();

        return response.status(201).json(merchant);
    }

    async show({ params, response }) {
        const submerchant = await Database
            .table('submerchants')
            .select('submerchants.id as id', 'submerchants.id_merchant as id_merchant', 'submerchants.name as name', 'submerchants.description as description', 'submerchants.image as image', 'submerchants.active as active', 'submerchants.shift as shift', 'role_user.role_id as role_id', 'role_user.user_id as user_id', 'role_user.merchant_id as merchant_id', 'role_user.submerchant_id as submerchant_id', 'users.email as email')
            .leftJoin('role_user', 'submerchants.id', 'role_user.submerchant_id')
            .leftJoin('users', 'role_user.user_id', 'users.id')
            .where('submerchants.id', params.id)
            .first()

        return response.json(submerchant);
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
        const { id, merchant_id, username, email, password } = request.only([
            "id",
            "merchant_id",
            "username",
            "email",
            "password"
        ]);

        const roleSubmerchant = await Database.from("roles")
            .where("slug", "submerchant")
            .first();

        const user = await User.create({
            username,
            email,
            password
        })
        await user.roles().attach([roleSubmerchant.id])

        const terakhir = await Database.table("users")
            .orderBy('id', 'desc')
            .first();

        await Database
            .table('role_user')
            .where('user_id', terakhir.id)
            .update('merchant_id', merchant_id)
            .update('submerchant_id', id)

        return response.status(201).json(user);
    }
}

module.exports = SubmerchantController
