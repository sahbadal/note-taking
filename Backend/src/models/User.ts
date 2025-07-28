import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  dob?: Date;
  otp?: string;
  otpExpiry?: Date;
  authType: 'email' | 'google';
  googleId?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    otp: { type: String },
    otpExpiry: { type: Date },
    authType: { type: String, enum: ['email', 'google'], default: 'email' },
    googleId: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
