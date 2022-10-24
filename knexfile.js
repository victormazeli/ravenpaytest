require("dotenv").config();
const pg = require("pg");
// pg.defaults.ssl = true;

module.exports = {
  development: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      port: process.env.MYSQL_DEV_PORT,
      user: process.env.MYSQL_DEV_USER,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  testing: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_TEST_HOST,
      port: process.env.MYSQL_TEST_PORT,
      user: process.env.MYSQL_TEST_USER,
      password: process.env.MYSQL_TEST_PASSWORD,
      database: process.env.MYSQL_TEST_DATABASE
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
