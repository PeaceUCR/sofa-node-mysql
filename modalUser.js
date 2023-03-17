const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')
const moment = require('moment');

const User = seq.define('user', {
  // Model attributes are defined here
  openId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  collectionLimit: {
    type: DataTypes.NUMBER
  },
  score: {
    type: DataTypes.NUMBER
  },
  nickname: {
    type: DataTypes.STRING
  },
  avatarUrl: {
    type: DataTypes.STRING
  },
  lastTimeLogin: {
    type: 'TIMESTAMP'
  },
}, {
  tableName: 'user',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('database_export-78D27TBg0bV2.json', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line, index) => {
  if (line) {
    const obj = JSON.parse(line);
    const {score, openId, avatarUrl, nickName, lastTimeLogin, collectionLimit} = obj;

    setTimeout(async () => {
      try {
        await User.create({
          openId: openId,
          collectionLimit: collectionLimit || 20,
          score: score || 3,
          nickname: nickName,
          avatarUrl: avatarUrl,
          lastTimeLogin: moment(lastTimeLogin).toDate()
        })
      } catch (e) {
        console.log(e)
      }
    }, index * 200);
  }
})