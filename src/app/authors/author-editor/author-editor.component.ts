import { Component, OnInit, Input } from "@angular/core";
import { Author } from "../../models/author";
import { AuthorsService } from "../authors.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "bm-author-editor",
  templateUrl: "./author-editor.component.html",
  styleUrls: ["./author-editor.component.scss"]
})
export class AuthorEditorComponent implements OnInit {
  @Input() id?: number;

  authorForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    description: new FormControl(""),
    rating: new FormControl()
  });

  constructor(private authorService: AuthorsService) {}

  ngOnInit() {}

  saveAuthor() {
    const author = new Author();
    author.firstName = this.authorForm.value.firstName;
    author.lastName = this.authorForm.value.lastName;
    author.rating = this.authorForm.value.rating;
    console.log("Author: " + author);
    this.authorService.createAuthor(author).subscribe(response => {});
  }
}
