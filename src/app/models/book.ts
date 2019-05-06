import { Author } from "./author";
import { Genre } from "./genre";
import { Collection } from "./collection";
import { Series } from "./series";

export class Book {
  id: number;
  title: string;
  description: string;
  rating: number;
  author: Author;
  genre: Genre[];
  series: Series;
  collection: Collection;
}
