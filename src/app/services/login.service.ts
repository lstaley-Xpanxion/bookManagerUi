import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  apiUrl = "http://localhost:8084/bookManager/api";
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  login(user: User) {
    const options = new HttpHeaders({
      Authorization: "Basic " + btoa("user.userName" + ":" + user.password)
    });
    return this.http.post<Observable<boolean>>(this.apiUrl + "/login", {
      userName: user.userName,
      password: user.password
    });
  }
}
