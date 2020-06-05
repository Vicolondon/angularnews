import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  /* 
  Declaration
  */
      // Properties
      public userData: any;

  constructor(
    private LoginService: LoginService
  ) {
    let token = localStorage.getItem("access_token")
    if( token != undefined){
      this.userData = this.LoginService.getUserInfo(token).subscribe();
    }
  }

  public connected = async () => {
    let token = localStorage.getItem("access_token")
    if( token != undefined){
      this.userData = await this.LoginService.getUserInfo(token).subscribe();
    }
  }
  
  public logout(){
    localStorage.clear();
  }

  ngOnInit() {
    this.connected();
  }

}
