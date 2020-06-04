export default interface IApp {
  id: number;
  name: string;
  url: string;
  image_url: string;
  removed: boolean;
  created_at: Date;
  updated_at: Date;
}