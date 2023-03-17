const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')
const moment = require('moment');

const Consult = seq.define('example', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  number: {
    type: DataTypes.NUMBER
  },
  title: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  extra: {
    type: DataTypes.JSON
  },
  text: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'example',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('consult-export-all-2-20.json', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line, index) => {
  if (line) {
    const obj = JSON.parse(line);
    const {_id, number, title, text} = obj;

    setTimeout(async () => {
      try {
        await Consult.create({
          id: _id,
          number: number,
          title: title,
          text: text,
          type: '刑事审判参考'
        })
      } catch (e) {
        console.log(e)
      }
    }, index * 200);
  }
})