const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')

const JudgmentDetail = seq.define('judgment_detail', {
  // Model attributes are defined here
  rowKey: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  textHead: {
    type: DataTypes.STRING
  },
  textPartner: {
    type: DataTypes.STRING
  },
  textMain: {
    type: DataTypes.STRING
  },
  textDecide: {
    type: DataTypes.STRING
  },
  textJudge: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'judgment_detail',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('xab', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line, index) => {
  if (line) {
    const obj = JSON.parse(line);
    const {_id, rowKey, textHead, textPartner, textMain, textDecide, textJudge} = obj;

    setTimeout(async () => {
      console.log(index)
      try {
        await JudgmentDetail.create({
          rowKey,
          textHead,
          textPartner,
          textMain,
          textDecide,
          textJudge
        })
      } catch (e) {
        console.log(e)
      }
    }, index * 100);
  }
})