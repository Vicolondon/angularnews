import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login/login.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  public userInfo: any;

  constructor(
    private LoginService: LoginService
  ) {
  }


  public getUserInfo = async() =>{
    let token = JSON.parse(localStorage.getItem('access_token'));
    await this.LoginService.getUserInfo(token).subscribe((response:any) => {
      this.userInfo = response.data.user;
      // if (localStorage.getItem("previousSource")) {
      //   this.changeSelectedSource(localStorage.getItem("previousSource"));
      // }
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
