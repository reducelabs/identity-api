import { Request, Response } from 'express';
import knex from '../database/connection';
import IUser from '../models/user.interface';


export default class SignUpController {
  async checkEmailExist(request: Request, response: Response) {
    const { email } = request.params;
    const user = await knex<IUser>('users')
      .where('removed', false)
      .where('email', email.trim())
      .first();
    return response.json({
      email: user?.email,
      exists: !!user
    });
  }
  async checkUsernameExist(request: Request, response: Response) {
    const { username } = request.params;
    const user = await knex<IUser>('users')
      .where('removed', false)
      .where('username', username.toLocaleLowerCase().trim())
      .first();
    return response.json({
      username: user?.username,
      exists: !!user
    });
  }
  async register(request: Request, response: Response) {
    const {
      name,
      username,
      email,
      password
     } = request.body;
    const user = await knex<IUser>('users')
      .where('removed', false)
      .where('username', username.trim())
      .first();
    return response.json({
      username: user?.username,
      exists: !!user
    });
  }
}