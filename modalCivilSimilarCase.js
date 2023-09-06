const { Sequelize, DataTypes } = require('sequelize');
const seq = require('./connect')

const JudgmentDetail = seq.define('civil_similar_case', {
  // Model attributes are defined here
  uniqid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  casetype: {
    type: DataTypes.STRING
  },
  procedure: {
    type: DataTypes.STRING
  },
  referencetype: {
    type: DataTypes.STRING
  },
  courtlevel: {
    type: DataTypes.STRING
  },
  court: {
    type: DataTypes.STRING
  },
  province: {
    type: DataTypes.STRING
  },
  casecause: {
    type: DataTypes.STRING
  },
  casecausefull: {
    type: DataTypes.STRING
  },
  multicasecause: {
    type: DataTypes.STRING
  },
  judgedate: {
    type: DataTypes.STRING
  },
  judgeyear: {
    type: DataTypes.STRING
  },
  features: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  paragraphs: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'civil_similar_case',
  timestamps: false,
});

const fs = require('fs');
const examples = fs.readFileSync('民法典类案检索裁判规则-detail-plus.json', {encoding: 'utf-8'});
const lines = examples.split(/\r\n|\n/);

lines.forEach(async (line, index) => {
  if (line) {
    const obj = JSON.parse(line);
    const {uniqid, casetype, procedure, referencetype, courtlevel, court, province, casecause, casecausefull, multicasecause, judgedate, judgeyear, features, title, paragraphs} = obj;

    setTimeout(async () => {
      console.log(index)
      try {
        await JudgmentDetail.create({
          uniqid,
          casetype,
          procedure,
          referencetype,
          courtlevel,
          court,
          province,
          casecause,
          casecausefull: JSON.stringify(casecausefull),
          multicasecause: JSON.stringify(multicasecause),
          judgedate,
          judgeyear,
          features: JSON.stringify(features),
          title,
          paragraphs: JSON.stringify(paragraphs)
        })
      } catch (e) {
        console.log(e)
      }
    }, index * 100);
  }
})