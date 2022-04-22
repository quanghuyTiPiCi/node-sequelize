require('dotenv').config();
module.exports = {
  development: {
    database: 'node_sequelize',
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    query: {
      raw: true,
    },
    timezone: '+07:00',
  },
  test: {
    database: 'node_sequelize',
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    database: 'node_sequelize',
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
  },
};
