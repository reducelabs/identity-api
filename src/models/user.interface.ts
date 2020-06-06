export default interface IUser {
  id: number;
  name: string;
  username: string;
  image_url: string;
  email: string;
  email_confirmed: boolean;
  security_stamp: string;
  phone_number: string;
  phone_number_confirmed: boolean;
  two_factor_enabled: boolean;
  lockout_end: Date;
  lockout_enabled: boolean;
  access_failed_count: number;
  hash: string;
  salt: string;
  created_at: Date;
  updated_at: Date;
  removed: boolean;
}