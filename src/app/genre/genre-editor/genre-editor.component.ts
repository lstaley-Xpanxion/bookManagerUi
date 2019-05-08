import { Component, OnInit } from "@angular/core";
import { GenreService } from "src/app/services/genre.service";
import { Genre } from "src/app/models/genre";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "bm-genre-editor",
  templateUrl: "./genre-editor.component.html",
  styleUrls: ["./genre-editor.component.scss"]
})
export class GenreEditorComponent implements OnInit {
  genreForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl("")
  });

  constructor(private genreService: GenreService) {}

  ngOnInit() {}

  saveGenre() {
    const genre = new Genre();
    genre.name = this.genreForm.value.name;
    genre.description = this.genreForm.value.description;
    this.genreService.createGenre(genre).subscribe(() => {});
  }
}
