import mongoose from 'mongoose';

const LEVEL_SKILL = mongoose.model('Level_Skill', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  level: { type: Number },
  favorite: { type: Boolean }
}));

export default LEVEL_SKILL;
