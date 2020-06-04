import express from 'express';

import UsersController from './controllers/UsersController';
import AppsController from './controllers/AppsController';
import GroupsController from './controllers/GroupsController';

const routes = express.Router();
const usersController = new UsersController();
const appsController = new AppsController();
const groupsController = new GroupsController();

// Users
routes.get('/users', usersController.index);
routes.post('/users', usersController.create);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.delete);
routes.get('/users/:id', usersController.show);

// Apps
routes.get('/apps', appsController.index);
routes.post('/apps', appsController.create);
routes.put('/apps/:id', appsController.update);
routes.delete('/apps/:id', appsController.delete);
routes.get('/apps/:id', appsController.show);

// Groups
routes.get('/groups', groupsController.index);
routes.post('/groups', groupsController.create);
routes.put('/groups/:id', groupsController.update);
routes.delete('/groups/:id', groupsController.delete);
routes.get('/groups/:id', groupsController.show);

export default routes;