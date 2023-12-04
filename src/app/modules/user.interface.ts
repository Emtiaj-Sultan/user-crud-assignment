import { Model } from 'mongoose';

export interface TOrders {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: TOrders[];
}
export interface SubTUser
  extends Omit<
    TUser,
    | 'password'
    | 'orders'
    | 'address'
    | 'fullName'
    | 'age'
    | 'userId'
    | 'username'
    | 'hobbies'
    | 'isActive'
    | 'email'
  > {}

export interface UserMethod extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
