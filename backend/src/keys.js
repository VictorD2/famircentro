const config = require("./config");
module.exports = {
  database: {
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    database: config.DATABASE_NAME,
    dateStrings: true,
    port: config.PORT,
  },
};
