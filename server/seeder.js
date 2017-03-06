/* eslint-disable no-console, no-shadow */
/* eslint no-underscore-dangle: off*/

import chalk from 'chalk';
import USER from './appData/models/user';
import SKILL from './appData/models/skill';
import LEVEL_SKILL from './appData/models/levelSkill';

const users = [
  {
    _id: '58951027734d1d3956c4baaa',
    firstName: 'Severus',
    lastName: 'Snape',
    role: 'Node.js Magican',
    _level_skills: ['58951027734d1d3956c4aaba', '58951027734d1d3956c4aada', '28951027734d1d3956c4aaaa']
  },
  {
    _id: '58951027734d1d3956c4caaa',
    firstName: 'Albus',
    lastName: 'Dumbledore',
    role: 'Fullstack Archmage',
    _level_skills: ['58951027734d1d3956c4aaca', '58951027734d1d3956c4aaea', '58951027734d1d3956c4aafa']
  },
  {
    _id: '58951027734d1d3956c4daaa',
    firstName: 'Ron',
    lastName: 'Weasley',
    role: 'Frontend developer',
    _level_skills: ['18951027734d1d3956c4aaaa', '38951027734d1d3956c4aaaa', '48951027734d1d3956c4aaaa']
  }
];

const skills = [
  {
    _id: '58951027734d1d3956c4abaa',
    name: 'Node.js',
    _level_skills: ['58951027734d1d3956c4aaba', '58951027734d1d3956c4aaca', '18951027734d1d3956c4aaaa']
  },
  {
    _id: '58951027734d1d3956c4acaa',
    name: 'GraphQL',
    _level_skills: ['58951027734d1d3956c4aada', '58951027734d1d3956c4aaea', '38951027734d1d3956c4aaaa']
  },
  {
    _id: '58951027734d1d3956c4adaa',
    name: 'Javascript',
    _level_skills: ['28951027734d1d3956c4aaaa', '58951027734d1d3956c4aafa', '48951027734d1d3956c4aaaa']
  }
];

const levelSkills = [
  // first three level_skills belong to Node.js
  {
    _id: '58951027734d1d3956c4aaba',
    level: 3,
    favorite: true,
  },
  {
    _id: '58951027734d1d3956c4aaca',
    level: 1,
    favorite: false
  },
  {
    _id: '18951027734d1d3956c4aaaa',
    level: 2,
    favorite: true
  },
  // three next ones are for GraphQL
  {
    _id: '58951027734d1d3956c4aada',
    level: 3,
    favorite: true,
  },
  {
    _id: '58951027734d1d3956c4aaea',
    level: 2,
    favorite: true
  },
  {
    _id: '58951027734d1d3956c4aafa',
    level: 3,
    favorite: true,
  },
  // last ones are js
  {
    _id: '28951027734d1d3956c4aaaa',
    level: 1,
    favorite: false,
  },
  {
    _id: '38951027734d1d3956c4aaaa',
    level: 3,
    favorite: true,
  },
  {
    _id: '48951027734d1d3956c4aaaa',
    level: 3,
    favorite: false
  },
];


const seedlevelSkills = () => levelSkills.map(singleLevelSkill => (new LEVEL_SKILL(singleLevelSkill)).save((err, savedLevelSkill) => { if (err) return err; return console.log(chalk.blue(`Skill level with _id: ${savedLevelSkill._id} seeded`)); }));
const seedSkills = () => skills.map(singleSkill => (new SKILL(singleSkill)).save((err, savedSkill) => { if (err) return console.error(err); return console.log(chalk.blue(`Skill with _id: ${savedSkill._id} seeded`)); }));
const seedUsers = () => users.map(singleUser => (new USER(singleUser)).save((err, savedUser) => { if (err) return console.error(err); return console.log(chalk.blue(`User with _id: ${savedUser._id} seeded`)); }));

const seeder = () => {
  seedUsers();
  seedlevelSkills();
  seedSkills();
};

export default seeder;
