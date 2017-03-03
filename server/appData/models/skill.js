import mongoose from 'mongoose';

const SKILL = mongoose.model('Skill', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  _level_skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level_Skill' }]
}));

export default SKILL;
