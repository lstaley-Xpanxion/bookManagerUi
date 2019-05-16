import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ToasterService } from "../services/toaster.service";

@Component({
  selector: "bm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl()
  });

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {}

  show() {
    console.log("Show");
    this.toasterService.showSuccessToaster("Logged In");
  }

  // mat-simple-snackbar ng-star-inserted
  // simple-snack-bar
}
