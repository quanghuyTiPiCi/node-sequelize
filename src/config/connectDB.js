const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:quanghuy@localhost:5432/node_sequelize',
  {
    dialect: 'postgres',
    logging: false,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully!');
  } catch (error) {
    console.log('Failed');
  }
};

module.exports = connectDB;
