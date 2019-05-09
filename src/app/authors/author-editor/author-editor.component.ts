import { Component, OnInit } from "@angular/core";
import { Author } from "../../models/author";
import { AuthorsService } from "../../services/authors.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "bm-author-editor",
  templateUrl: "./author-editor.component.html",
  styleUrls: ["./author-editor.component.scss"]
})
export class AuthorEditorComponent implements OnInit {
  authorForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    rating: new FormControl()
  });

  constructor(
    private authorService: AuthorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.populateForm(id);
    }
    console.log("id " + id);
  }

  saveAuthor() {
    const author = new Author();
    author.firstName = this.authorForm.value.firstName;
    author.lastName = this.authorForm.value.lastName;
    author.rating = this.authorForm.value.rating;
    console.log("Author: " + author);
    this.authorService.createAuthor(author).subscribe(() => {});
  }

  private populateForm(id) {
    this.authorService
      .getAuthor(id)
      .pipe(
        map((resp: any) => {
          this.authorForm.get("firstName").patchValue(resp.firstName);
          this.authorForm.get("lastName").patchValue(resp.lastName);
          this.authorForm.get("rating").patchValue(resp.rating);
        })
      )
      .subscribe();
  }
}
