import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./authors/authors.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookEditorComponent } from "./books/book-editor/book-editor.component";
import { AuthorEditorComponent } from "./authors/author-editor/author-editor.component";
import { LoginComponent } from "./login/login.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CollectionEditorComponent } from "./collections/collection-editor/collection-editor.component";
import { SeriesComponent } from "./series/series.component";
import { SeriesEditorComponent } from "./series/series-editor/series-editor.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "dashboard", component: DashboardComponent },
  { path: "books", component: BooksComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "books/editor", component: BookEditorComponent },
  { path: "authors/editor/:id", component: AuthorEditorComponent },
  { path: "authors/editor", component: AuthorEditorComponent },
  { path: "login", component: LoginComponent },
  { path: "collections", component: CollectionsComponent },
  { path: "collections/editor", component: CollectionEditorComponent },
  { path: "series", component: SeriesComponent },
  { path: "series/editor", component: SeriesEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
