import { Author } from "./author";

export class Series {
  id: number;
  name: string;
  description: string;
  author: Author;
  rating: number;
  updateDate: Date;
}
