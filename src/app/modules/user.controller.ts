/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.services';
import { userUpdateValidationZodSchema } from './user.updateValidation';
import { userValidationZodSchema } from './user.zodvalidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidationData = userValidationZodSchema.parse(user);
    const result = await userServices.createUserIntoDB(zodValidationData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User creation failed!',
      error: {
        code: 500,
        description: 'User creation failed!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User fetched failed!',
      error: {
        code: 404,
        description: error.message || 'User fetched failed!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Single user fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Single user fetched failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User deleted failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const zodValidationData = userUpdateValidationZodSchema.parse(userData);
    const result = await userServices.updateUserFromDB(
      parseInt(userId),
      zodValidationData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User update failed!',
      error: {
        code: 404,
        description: error.message || 'User update failed!',
      },
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userServices.addNewOrderToUserDB(
      parseInt(userId),
      userData,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Order created failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllSingleUserOrdersFromDB(
      parseInt(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Order fetched failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.calculateTotalOrdersPriceFromDB(
      parseInt(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Total price calculated failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewOrder,
  getSingleUserOrders,
  totalPrice,
};
