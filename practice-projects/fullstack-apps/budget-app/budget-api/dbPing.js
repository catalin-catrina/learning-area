require("dotenv").config();
const { Pool } = require("pg");

(async () => {
  const db = new Pool({ connectionString: process.env.PG_CONN });
  const { rows } = await db.query("SELECT 1 AS hello");
  console.log(rows); // should log  [ { hello: 1 } ]
  await db.end();
})();
