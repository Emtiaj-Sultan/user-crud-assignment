import { SubTUser, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser): Promise<SubTUser> => {
  const newUser = await User.create(user);
  const { userId, username, fullName, age, email, isActive, hobbies, address } =
    newUser;
  const result = {
    userId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  };
  return result;
};

const getAllUserFromDB = async (): Promise<TUser[]> => {
  if ((await User.countDocuments()) !== 0) {
    const result = await User.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          address: 1,
        },
      },
    ]);
    return result;
  }
  throw new Error('Not found!');
};
const getSingleUserFromDB = async (userId: number): Promise<TUser | null> => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId });
    return result;
  }
  throw new Error('User not found');
};

const deleteUserFromDB = async (userId: number): Promise<SubTUser | null> => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result.deletedCount && null;
  }
  throw new Error('User not found');
};
const updateUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate(
      { userId: userId },
      { $set: userData },
      {
        new: true,
        runValidators: true,
      },
    ).select({
      orders: 0,
      _id: 0,
    });
    return result;
  }
  throw new Error('User not found');
};
const addNewOrderToUserDB = async (
  userId: number,
  userData: TUser,
): Promise<SubTUser | null> => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      { userId: userId, orders: { $exists: true } },
      { $push: { orders: userData } },
      { new: true, runValidators: true },
    );
    return result.upsertedId;
  }
  throw new Error('User not found');
};

const getAllSingleUserOrdersFromDB = async (
  userId: number,
): Promise<SubTUser | null> => {
  if (await User.isUserExists(userId)) {
    const allOrders = await User.findOne(
      { userId: userId },
      {
        orders: 1,
        _id: 0,
      },
    );
    if (allOrders?.orders.length !== 0) return allOrders;
    throw new Error("Have n't place any order yet. please order first!");
  }
  throw new Error('User not found');
};
const calculateTotalOrdersPriceFromDB = async (
  userId: number,
): Promise<SubTUser | null> => {
  if (await User.isUserExists(userId)) {
    const totalPrice = await User.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$orders.price',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: '$totalPrice',
          },
        },
      },

      {
        $project: {
          totalPrice: 1,
          _id: 0,
        },
      },
    ]);
    if (totalPrice.length !== 0) return totalPrice;
    throw new Error('There have no order to calculated!');
  }
  throw new Error('User not found');
};
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addNewOrderToUserDB,
  getAllSingleUserOrdersFromDB,
  calculateTotalOrdersPriceFromDB,
};
