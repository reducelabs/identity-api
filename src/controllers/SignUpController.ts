import { Request, Response } from 'express';
import knex from '../database/connection';
import crypto from 'crypto';


export default class SignUpController {
  async checkEmailExist(request: Request, response: Response) {
    const { email } = request.params;
    const user = await knex('users')
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
    const user = await knex('users')
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

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt,
      1000, 512, 'sha512').toString('hex');
    const user = {
      name,
      email,
      hash,
      salt,
      removed: false,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    };
    const trx = await knex.transaction();
    const [idInserted] = await trx('users').insert(user);
    await trx.commit();

    return response.json();
  }
}