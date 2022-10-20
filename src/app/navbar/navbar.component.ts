import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService , private _Router:Router) {

   }

   logOut()
   {
     localStorage.clear()
     this._Router.navigate(['/sign-in'])
   }
   
 

  ngOnInit(): void {
  }

}
