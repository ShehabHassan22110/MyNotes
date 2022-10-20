import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from "jwt-decode";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basURL = 'https://routeegypt.herokuapp.com/' ;
  currentUser = new BehaviorSubject(null) ;
  constructor(private _HttpClient:HttpClient , private _Router:Router)    { }

  signUp(data:any):Observable<any>
  {
    return this._HttpClient.post(this.basURL+ 'signup',data)

  }
  signIn(data:any):Observable<any>
  {
   return this._HttpClient.post(this.basURL+ 'signin',data)

  }
  signOut(data:any):Observable<any>
  {
   return this._HttpClient.post(this.basURL+ 'signOut',data)

  }


  isLoggedIn()
  {
    return !!localStorage.getItem('TOKEN') 
  }
  
}
