import { Request, Response } from 'express';
import knex from '../database/connection';
import IApp from '../models/app.interface';

export default class AppsController {
  async index(request: Request, response: Response) {
    const apps = await knex<IApp>('apps')
      .select('*')
      .where('removed', false);
    return response.json(apps);
  }
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await knex<IApp>('apps')
        .where('id', id)
        .where('removed', false)
        .first();
  
      if (!user) {
        return response.status(400).json({ message: `App with id ${id} not found` });
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
      url,
      image_url,
    } = request.body;
    const app = {
      id: 0,
      name,
      url,
      image_url,
      removed: false,
      created_at: new Date(),
      updated_at: new Date(),
    } as IApp;
    const trx = await knex.transaction();
    try {
      const [idInserted] = await trx('apps').insert(app);
      app.id = idInserted;
      await trx.commit();
      return response.json(app);
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
      url,
      image_url,
    } = request.body;
    const app = await knex<IApp>('apps')
      .where('id', id)
      .where('removed', false)
      .first();

    if (!app) {
      return response.status(400).json({ message: `App with id ${id} not found` });
    }
    app.name = name;
    app.url = url;
    app.image_url = image_url;
    app.updated_at = new Date();
    const trx = await knex.transaction();
    try {
      await trx('apps')
        .update(app)
        .where('id', app.id);
    
      await trx.commit();
      return response.json(app);
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
    const app = await knex<IApp>('apps')
      .where('id', id)
      .where('removed', false)
      .first();
      
    if (!app) {
      return response.status(400).json({ message: `App with id ${id} not found` });
    }
    app.removed = true;
    app.updated_at = new Date();
    const trx = await knex.transaction();
    try {
      await trx<IApp>('apps')
        .update(app)
        .where('id', app.id);
      
      await trx.commit();
      return response.json(app);
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        message: 'Erro in request',
        error
      });
    }
  }
}