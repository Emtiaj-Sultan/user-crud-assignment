import { Schema, model } from 'mongoose';
import { TUser, UserMethod } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userSchema = new Schema<TUser, UserMethod>(
  {
    userId: { type: Number, required: true, unique: true },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    fullName: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
      },
    },
    age: { type: Number, required: [true, 'Age is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    isActive: { type: Boolean },
    hobbies: { type: [String] },
    address: {
      street: { type: String, required: [true, 'Street is required'] },
      city: { type: String, required: [true, 'City is required'] },
      country: { type: String, required: [true, 'Country is required'] },
    },
    orders: {
      type: [
        {
          productName: {
            type: String,
            required: [true, 'Product name is required'],
          },
          price: { type: Number, required: [true, 'Price is required'] },
          quantity: { type: Number, required: [true, 'Quantity is required'] },
        },
      ],
      default: [],
    },
  },
  { versionKey: false },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});
userSchema.pre(
  'findOneAndUpdate',
  { document: false, query: true },
  async function () {
    const filter = this.getFilter();
    const user = await this.model.findOne(filter);
    const hashed = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
    this.set('password', hashed);
  },
);

// Custom statics method for check user has or not
userSchema.statics.isUserExists = async function (userId: number) {
  const userExists = await User.findOne({ userId });
  return userExists;
};
// Hide password from response use this method
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model<TUser, UserMethod>('User', userSchema);
