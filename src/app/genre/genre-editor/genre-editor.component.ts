import { Component, OnInit } from "@angular/core";
import { GenreService } from "src/app/services/genre.service";
import { Genre } from "src/app/models/genre";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ToasterService } from "src/app/services/toaster.service";

@Component({
  selector: "bm-genre-editor",
  templateUrl: "./genre-editor.component.html",
  styleUrls: ["./genre-editor.component.scss"]
})
export class GenreEditorComponent implements OnInit {
  genreForm = new FormGroup({
    name: new FormControl("", Validators.maxLength(250)),
    description: new FormControl("", Validators.maxLength(500))
  });

  id: any;

  constructor(
    private genreService: GenreService,
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

  saveGenre() {
    const genre = new Genre();
    genre.id = this.id;
    genre.name = this.genreForm.value.name;
    genre.description = this.genreForm.value.description;
    this.genreService.createGenre(genre).subscribe(
      () => {
        this.toasterService.showSuccessToaster("Genre was saved successfully");
        this.router.navigate(["/genres"]);
      },
      () => this.toasterService.showErrorToaster("Saving of Genre failed")
    );
  }

  private populateForm(id) {
    this.genreService
      .getGenre(id)
      .pipe(
        map((resp: any) => {
          this.genreForm.get("description").patchValue(resp.description);
          this.genreForm.get("name").patchValue(resp.name);
        })
      )
      .subscribe();
  }
}
