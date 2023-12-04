import express from 'express';
import { userController } from './user.controller';

const Router = express.Router();

Router.post('/users', userController.createUser);
Router.get('/users', userController.getAllUsers);
Router.get('/users/:userId', userController.getSingleUser);
Router.delete('/users/:userId', userController.deleteUser);
Router.put('/users/:userId', userController.updateUser);
Router.put('/users/:userId/orders', userController.addNewOrder);
Router.get('/users/:userId/orders', userController.getSingleUserOrders);
Router.get('/users/:userId/orders/total-price', userController.totalPrice);

export const userRoutes = Router;
