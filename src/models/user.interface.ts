export default interface IUser {
  id: number;
  name: string;
  email: string;
  image_url: string;
  hash: string;
  salt: string;
  removed: boolean;
  created_at: Date;
  updated_at: Date;
}