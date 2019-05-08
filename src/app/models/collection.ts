import { Author } from "./author";
import { Book } from "./book";
import { Series } from "./series";
import { Genre } from "./genre";

export class Collection {
  id: number;
  name: string;
  description: string;
  rating: number;
  authors: Author[];
  books: Book[];
  series: Series[];
  genres: Genre[];
}
