import crypto from 'crypto';
import IUser from './user.interface';

export default class User implements IUser {
  hash: string;
  salt: string;
  removed: boolean;
  created_at?: Date;
  updated_at?: Date;
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public image_url: string,
  ) {
    this.hash = '';
    this.salt = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.removed = false;
  }

  
  public update(name: string, image_url: string, password: string): void {
    this.name = name;
    this.image_url = image_url;
    this.setPassword(password);
    this.updated_at = new Date();
  }

  public delete(): void {
    this.removed = true;
    this.updated_at = new Date();
  }
  
  public setPassword(password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex');
  
    this.hash = crypto.pbkdf2Sync(password, this.salt,
      1000, 512, 'sha512').toString('hex');
  }

  public validatePassword(password: string): boolean {
    const passwordHash = crypto.pbkdf2Sync(password,
      this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === passwordHash;
  }
}