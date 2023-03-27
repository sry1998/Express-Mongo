import mongoose from 'mongoose';

const constant = require('../helpers/constants');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
  },
});

const Users = mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  userName: { type: String, default: '' },
  email: { type: String, lowercase: true, default: '' },
  password: { type: String, select: false },
  roleCode: { type: String, default: '' },
}, {
  versionKey: false,
});

export default mongoose.model('Users', Users, 'Users');
