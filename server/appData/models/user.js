import mongoose from 'mongoose';

const USER = mongoose.model('User', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String },
  _level_skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level_Skill' }]
}));

export default USER;
