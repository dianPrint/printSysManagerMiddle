const { Pool } = require("pg");
const userInit = require("./user");
const permissionInit = require("./permission");
const roleInit = require("./role");
const role_permissionInit = require("./role_permission");
const user_roleInit = require("./user_role");
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "public_services",
  password: "postgres",
  port: 5432
});
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  //process.exit(-1)
});
const start =  () => {
  return {
    user: userInit(pool),
    permission: permissionInit(pool),
    role: roleInit(pool),
    role_permission: role_permissionInit(pool),
    user_role: user_roleInit(pool)
  };
};


module.exports = start();
