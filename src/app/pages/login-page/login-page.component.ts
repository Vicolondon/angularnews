import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../service/login/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public userInfo : any;
  constructor(
    private LoginService: LoginService,
    public Router: Router
  ) { }

  public getRegistered(element){
    this.LoginService.getRegistered(element.email, element.password, element.firstname, element.lastname).subscribe((response:any) => {
      this.userInfo = response.data;
      // if (localStorage.getItem("previousSource")) {
      //   this.changeSelectedSource(localStorage.getItem("previousSource"));
      // }
    });
  }

  public getLoggedIn(element){
    this.LoginService.getLoggedIn(element.email, element.password).subscribe((response:any) => {
      this.userInfo = response.data;
      localStorage.setItem("access_token", JSON.stringify(this.userInfo.token));
      this.Router.navigate(['me']);
      // if (localStorage.getItem("previousSource")) {
      //   this.changeSelectedSource(localStorage.getItem("previousSource"));
      // }
    });
  }

  ngOnInit() {
  }
}
