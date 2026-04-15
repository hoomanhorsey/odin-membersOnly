const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;

// module.exports = new Pool({
//   host: "localhost", // or wherever the db is hosted
//   user: "dev_user",
//   database: "members_only",
//   //   password: "<role_password>",
//   port: 5432, // The default port
// });
