import { Request, Response } from 'express';
import knex from '../database/connection';
import crypto from 'crypto';
import IUser from '../models/user.interface';

export default class UsersController {
  async index(request: Request, response: Response) {
    const users = await knex<IUser>('users')
      .select('*')
      .where('removed', false);
    return response.json(users);
  }
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await knex<IUser>('users')
        .where('id', id)
        .where('removed', false)
        .first();
  
      if (!user) {
        return response.status(400).json({ message: `User with id ${id} not found` });
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
      name,
      email,
      image_url,
      password
    } = request.body;
    const hasUser = await knex<IUser>('users')
      .where('email', email)
      .first();

    if (hasUser && !hasUser.removed) {
      return response
        .status(400)
        .json({ message: 'User with email already exists' });
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt,
      1000, 512, 'sha512').toString('hex');
    const user = {
      id: hasUser ? hasUser.id : 0,
      name,
      email,
      image_url,
      hash,
      salt,
      removed: false,
      created_at: hasUser ? hasUser.created_at : new Date(),
      updated_at: new Date(),
    } as IUser;
    const trx = await knex.transaction();
    try {
      if (user.id !== 0) {
        await trx('users').update(user).where('id', user.id);
      } else {
        const [idInserted] = await trx('users').insert(user);
        user.id = idInserted;
      }
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
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      image_url,
    } = request.body;
    const user = await knex<IUser>('users')
      .where('id', id)
      .where('removed', false)
      .first();

    if (!user) {
      return response.status(400).json({ message: `User with id ${id} not found` });
    }
    user.name = name;
    user.image_url = image_url;
    user.updated_at = new Date();
    const trx = await knex.transaction();
    try {
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
      return response.status(400).json({ message: `User with id ${id} not found` });
    }
    user.removed = true;
    user.updated_at = new Date();
    const trx = await knex.transaction();
    try {
      await trx<IUser>('users')
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