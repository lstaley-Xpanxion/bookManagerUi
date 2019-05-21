import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ToasterService } from "../services/toaster.service";
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
  selector: "bm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    // email: new FormControl("", Validators.email),
    password: new FormControl()
  });

  constructor(
    private loginService: LoginService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    sessionStorage.setItem("token", "");
  }

  show() {
    console.log("Show");
    const user = new User();
    user.userName = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    this.loginService.login(user).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          "token",
          btoa(user.userName + ":" + user.password)
        );
        this.toasterService.showSuccessToaster("Logged In");
        this.router.navigate([""]);
      } else {
        this.router.navigate(["errors / access_denied"]);
      }
    });
  }
}
