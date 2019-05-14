import { Author } from "./author";
import { Genre } from "./genre";
import { Collection } from "./collection";
import { Series } from "./series";

export class Book {
  id: number;
  title: string;
  description: string;
  rating: number;
  updatedDate: Date;
  author: Author;
  genre: Genre[];
  series: Series;
  collection: Collection;
}
