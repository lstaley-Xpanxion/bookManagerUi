import { Book } from "./book";
import { Collection } from "./collection";
import { Series } from "./series";

export class Author {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  books: Book[];
  collections: Collection[];
  series: Series[];
}
