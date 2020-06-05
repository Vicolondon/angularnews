import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getRegistered(email, password, firstname, lastname): Observable<any> {
    return this.http.post(`${environment.API_URL}/register`, {"email": email,"password": password, "firstname": firstname, "lastname": lastname});
  }

  getLoggedIn(email, password): Observable<any> {
    return this.http.post(`${environment.API_URL}/login`, {"email": email,"password": password});
  }

  getUserInfo(token): Observable<any>  {
    return this.http.post(`${environment.API_URL}/me`, {"token": token});
  }

  public returnUserInfo(): Observable<any> { return this.userInfo };
  
  public setObservableData = (type: string, data: any) => {
    switch(type){ 
      case 'user':
    this.userInfo.next(data);
      break;
  
      default:
      break;
    };
  };
}
