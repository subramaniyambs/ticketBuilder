import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema({
  local: {
 
    email: { type: String, required: true, email: true },
    password: { type: String },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  google: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
  twitter: {
    username: String,
    id: String,
    token: String,
    displayName: String,
    email: String,
  },
  github: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
   
});
export default mongoose.model('User', UserSchema);
