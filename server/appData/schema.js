/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */
/* eslint "no-use-before-define": off */
/* eslint-disable */

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

import USER from './models/user';
import SKILL from './models/skill';
import LEVEL_SKILL from './models/levelSkill';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represents user',
  fields: () => ({
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    role: { type: GraphQLString },
    level_skills: {
      type: new GraphQLList(SkillLevel),
      description: 'Returns list of skills for certain user',
      resolve: user => {
        return user._level_skills.map((singleLevelSkill) => {
          return LEVEL_SKILL.findOne({ _id: singleLevelSkill }, (err, res) => {
            if (err) return err;
            return res;
          })
        })
      }
    }
  })
});

const Skill = new GraphQLObjectType({
  name: 'Skill',
  description: 'Represents skill',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const SkillLevel = new GraphQLObjectType({
  name: 'SkillLevel',
  description: 'Describes how well user knows certain skill.',
  fields: () => ({
    _id: { type: GraphQLString },
    level: {
      type: GraphQLString,
      description: 'Actual skill level, ranked from 1 to 3'
    },
    favorite: { type: GraphQLBoolean }
  })
});


const Query = new GraphQLObjectType({
  name: 'ProfileSchema',
  description: 'Root of the Profile',
  fields: () => ({
    helloQuery: {
      type: GraphQLString,
      description: 'Our first query field!',
      resolve: () => {
        return 'Hello from GraphiQL';
      }
    },
    users: {
      type: new GraphQLList(User),
      description: 'Netguru members',
      resolve: () => {
        return USER.find({}, (err, res) => {
          return res;
        });
      }
    },
    skills: {
      type: new GraphQLList(Skill),
      description: 'List of available skills to chose from',
      resolve: () => {
        return SKILL.find({}, (err, res) => {
          return res;
        });
      }
    },
    skillLevels: {
      type: new GraphQLList(SkillLevel),
      description: 'List of levels of certain skills for example { javascript: 3, favorite: true }.',
      level: GraphQLInt,
      resolve: () => {
        return LEVEL_SKILL.find({}, (err, res) => {
          return res;
        });
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
