import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./authors/authors.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookEditorComponent } from "./books/book-editor/book-editor.component";
import { AuthorEditorComponent } from "./authors/author-editor/author-editor.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "dashboard", component: DashboardComponent },
  { path: "books", component: BooksComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "books/editor", component: BookEditorComponent },
  { path: "authors/editor/:id", component: AuthorEditorComponent },
  { path: "authors/editor", component: AuthorEditorComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
