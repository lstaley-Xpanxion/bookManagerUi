import { Component, OnInit } from "@angular/core";
import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Author } from "../../models/author";

@Component({
  selector: "bm-author-editor",
  templateUrl: "./author-editor.component.html",
  styleUrls: ["./author-editor.component.scss"]
})
export class AuthorEditorComponent implements OnInit {
  author: Author = {
    id: 1,
    firstName: "",
    lastName: "",
    description: "",
    rating: 8
  };

  constructor() {}

  ngOnInit() {}
}
