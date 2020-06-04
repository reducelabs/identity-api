import { Request, Response } from 'express';
import knex from '../database/connection';
import User from '../models/user';
import IUser from '../models/user.interface';

export default class UsersController {
  async index(request: Request, response: Response) {
    const users = await knex<User>('users')
      .select('*')
      .where('removed', false);
    return response.json(users);
  }
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await knex<User>('users')
        .where('id', id)
        .where('removed', false)
        .first();
  
      if (!user) {
        return response.status(400).json({ message: 'User not found' });
      }
      return response.json(user);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro in request',
        error
      });
    }
  }
  async create(request: Request, response: Response) {
    const {
      id,
      name,
      email,
      image_url,
      password
    } = request.body;
    const hasUser = await knex<User>('users')
      .where('email', email)
      .where('removed', false)
      .first();

    if (hasUser) {
      return response
        .status(400)
        .json({ message: 'User with email already exists' });
    }
    const trx = await knex.transaction();
    try {
      const user = new User(
        id,
        name,
        email,
        image_url,
      );
      user.setPassword(password);
      const [idInserted] = await trx('users').insert(user);
    
      await trx.commit();
      user.id = idInserted;
      return response.json(user);
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        message: 'Erro in request',
        error
      });
    }
  }
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      password,
      image_url,
    } = request.body;
    const userOld = await knex<User>('users')
      .where('id', id)
      .where('removed', false)
      .first();

    if (!userOld) {
      return response.status(400).json({ message: 'User not found' });
    }
    const trx = await knex.transaction();
    try {
      const user = new User(
        userOld.id,
        name,
        userOld.email,
        image_url
      );
      user.setPassword(password);
      await trx('users')
        .update(user)
        .where('id', user.id);
    
      await trx.commit();
      return response.json(user);
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        message: 'Erro in request',
        error
      });
    }
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = await knex<IUser>('users')
      .where('id', id)
      .where('removed', false)
      .first();
      
    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    const trx = await knex.transaction();
    try {
      user.removed = true;
      user.updated_at = new Date();
      await trx<User>('users')
        .update(user)
        .where('id', user.id);
      
      await trx.commit();
      return response.json(user);
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        message: 'Erro in request',
        error
      });
    }
  }
}