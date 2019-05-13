import { Component, OnInit } from "@angular/core";
import { GenreService } from "src/app/services/genre.service";
import { Genre } from "src/app/models/genre";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "bm-genre-editor",
  templateUrl: "./genre-editor.component.html",
  styleUrls: ["./genre-editor.component.scss"]
})
export class GenreEditorComponent implements OnInit {
  genreForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  });

  id: any;

  constructor(
    private genreService: GenreService,
    private route: ActivatedRoute
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
    this.genreService.createGenre(genre).subscribe(() => {});
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
