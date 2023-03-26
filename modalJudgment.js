const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')
const moment = require('moment');

const Judgment = seq.define('judgment', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  rowKey: {
    type: DataTypes.STRING
  },
  cause: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  courtName: {
    type: DataTypes.STRING
  },
  caseNumber: {
    type: DataTypes.STRING
  },
  opinion: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.STRING
  },
  civilLaws: {
    type: DataTypes.STRING
  },
  criminalLaws: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.JSON
  },
}, {
  tableName: 'judgment',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('xac', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line, index) => {
  if (line) {
    const obj = JSON.parse(line);
    const {_id, cause, title, courtName, caseNumber, opinion, date, rowkey, civilLaws, tags} = obj;

    setTimeout(async () => {
      console.log(index)
      try {
        await Judgment.create({
          id: _id,
          cause,
          title,
          courtName,
          caseNumber,
          opinion,
          date,
          rowKey: rowkey,
          civilLaws: civilLaws.join(','),
          tags
        })
      } catch (e) {
        console.log(e)
      }
    }, index * 100);
  }
})