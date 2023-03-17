const { Sequelize } = require('sequelize');

const seq = new Sequelize('xxx', 'xxx', 'xxx', {
  host: 'xxx',
  dialect: 'mysql'
});

const tryConnect = async () => {
  try {
    await seq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

tryConnect()

module.exports = seq