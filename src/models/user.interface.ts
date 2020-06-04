export default interface IUser {
  id: number,
  name: string,
  email: string,
  image_url: string,
  hash: string;
  salt: string;
  created_at?: Date;
  updated_at?: Date;
  removed: boolean;

  update(name: string, image_url: string, password: string): void;
  delete(): void;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}