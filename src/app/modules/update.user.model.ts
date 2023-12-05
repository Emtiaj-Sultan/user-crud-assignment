import { Schema, model } from 'mongoose';
import { UpdateUser, UserMethod } from './update.user.interface';
import config from '../config';
import bcrypt from 'bcrypt';

const userUpdateSchema = new Schema<UpdateUser, UserMethod>(
  {
    userId: { type: Number, unique: true },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    fullName: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
    },
    age: { type: Number, trim: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    isActive: { type: Boolean },
    hobbies: { type: [String] },
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
    },
    orders: {
      type: [
        {
          productName: {
            type: String,
          },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
  },
  { versionKey: false },
);
userUpdateSchema.pre('findOneAndUpdate', async function () {
  const filter = this.getFilter();

  const user = await this.model.findOne(filter);
  console.log(user.password);
  const hashed = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  console.log(hashed);
  user.password = hashed;
  console.log(user.password);
  user.save();
});

// Custom statics method for check user has or not
userUpdateSchema.statics.isUserExists = async function (userId: number) {
  const userExists = await UpdatedUser.findOne({ userId });
  return userExists;
};
// Hide password from response use this method
userUpdateSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UpdatedUser = model<UpdateUser, UserMethod>(
  'UpdateUser',
  userUpdateSchema,
  'users',
);
