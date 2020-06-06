import express from 'express';

import SignUpController from './controllers/SignUpController';
import UsersController from './controllers/UsersController';
import AppsController from './controllers/AppsController';
import GroupsController from './controllers/GroupsController';

const routes = express.Router();
const signUpController = new SignUpController();
const usersController = new UsersController();
const appsController = new AppsController();
const groupsController = new GroupsController();

// SingUp
routes
  .post('/sign-up', signUpController.checkEmailExist)
  .get('/sign-up/check-email/:email', signUpController.checkEmailExist)
  .get('/sign-up/check-username/:username', signUpController.checkUsernameExist);

// Users
routes
  .get('/users', usersController.index)
  .post('/users', usersController.create)
  .put('/users/:id', usersController.update)
  .delete('/users/:id', usersController.delete)
  .get('/users/:id', usersController.show);

// Apps
routes.get('/apps', appsController.index)
  .post('/apps', appsController.create)
  .put('/apps/:id', appsController.update)
  .delete('/apps/:id', appsController.delete)
  .get('/apps/:id', appsController.show);

// Groups
routes.get('/groups', groupsController.index)
  .post('/groups', groupsController.create)
  .put('/groups/:id', groupsController.update)
  .delete('/groups/:id', groupsController.delete)
  .get('/groups/:id', groupsController.show);

export default routes;