const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')
const moment = require('moment');

const UserCollection = seq.define('user_collections', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  openId: {
    type: DataTypes.STRING
  },
  collectionId: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  time: {
    type: 'TIMESTAMP'
  },
}, {
  tableName: 'user_collections',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('database_export-SMxBSpxXeeiA.json', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line) => {
  if (line) {
    const obj = JSON.parse(line);
    const {_id, openId, collectionId, type, title, time, lastTimeLogin} = obj;
    let timeToSave;
    if (lastTimeLogin) {
      timeToSave = moment(lastTimeLogin);
    } else {
      const {$date} = time
      timeToSave = moment($date);
    }

    try {
      await UserCollection.create({
        id: _id,
        openId: openId,
        collectionId: collectionId,
        type: type,
        title: title,
        time: timeToSave.toDate()
      })
    } catch (e) {
      console.log(e)
    }
  }
})