import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from "./nav/nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule
} from "@angular/material";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookTableComponent } from "./books/book-table/book-table.component";
import { AuthorTableComponent } from "./authors/author-table/author-table.component";
import { BookEditorComponent } from "./books/book-editor/book-editor.component";
import { AuthorEditorComponent } from "./authors/author-editor/author-editor.component";
import { LoginComponent } from "./login/login.component";
import { HttpResponseInterceptor } from "./interceptor/httpresponse-interceptor";
import { CollectionsTableComponent } from './collections/collections-table/collections-table.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionEditorComponent } from './collections/collection-editor/collection-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    NavComponent,
    DashboardComponent,
    BookTableComponent,
    AuthorTableComponent,
    BookEditorComponent,
    AuthorEditorComponent,
    LoginComponent,
    CollectionsTableComponent,
    CollectionsComponent,
    CollectionEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
