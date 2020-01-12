"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

// /users
Route.group(() => {
  Route.post("login", "UserController.login");
  Route.post("register", "UserController.register");
  Route.get("getuser/:id", "UserController.show");
}).prefix("auth");

// SuperAdmin
// /merchants
Route.group(() => {
  Route.get("/", "SuperAdmin/MerchantController.index");
  Route.post("/", "SuperAdmin/MerchantController.store");
  Route.get("/:id", "SuperAdmin/MerchantController.show");
  Route.put("/:id", "SuperAdmin/MerchantController.update");
  Route.delete("/:id", "SuperAdmin/MerchantController.delete");
  Route.post("/register", "SuperAdmin/MerchantController.register");
}).prefix("merchants");

// Merchant
// /submerchants
Route.group(() => {
  Route.get("/:id", "Merchant/SubmerchantController.index");
  Route.post("/", "Merchant/SubmerchantController.store");
  Route.get("/single/:id", "Merchant/SubmerchantController.show");
  Route.put("/single/:id", "Merchant/SubmerchantController.update");
  Route.delete("/single/:id", "Merchant/SubmerchantController.delete");
  Route.post("/register", "Merchant/SubmerchantController.register");
}).prefix("submerchants");
