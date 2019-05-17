import { Component, OnInit } from "@angular/core";
import { Author } from "../../models/author";
import { AuthorsService } from "../../services/authors.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ToasterService } from "src/app/services/toaster.service";

@Component({
  selector: "bm-author-editor",
  templateUrl: "./author-editor.component.html",
  styleUrls: ["./author-editor.component.scss"]
})
export class AuthorEditorComponent implements OnInit {
  authorForm = new FormGroup({
    firstName: new FormControl("", Validators.maxLength(100)),
    lastName: new FormControl("", Validators.maxLength(100)),
    rating: new FormControl()
  });

  id: any;

  constructor(
    private authorService: AuthorsService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.populateForm(this.id);
    }
    console.log("id " + this.id);
  }

  saveAuthor() {
    const author = new Author();
    author.id = this.id;
    author.firstName = this.authorForm.value.firstName;
    author.lastName = this.authorForm.value.lastName;
    author.rating = this.authorForm.value.rating;
    console.log("Author: " + author);
    this.authorService.createAuthor(author).subscribe(
      () => {
        this.toasterService.showSuccessToaster("Saved Author");
        this.router.navigate(["/authors"]);
      },
      () => this.toasterService.showErrorToaster("Saving of Author failed")
    );
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
