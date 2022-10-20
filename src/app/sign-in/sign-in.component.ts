import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from "jwt-decode";





@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  error:string = "";

  constructor(private  _AuthService:AuthService , private _Router:Router) 
  {
    if(this._AuthService.isLoggedIn())
      {
        this._Router.navigate(['/profile'])
      }
   }
  signIn:FormGroup = new FormGroup ({
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.pattern('^[a-zA-Z0-9]{3,10}$')])
    })

  submitSignIn ()
  {
    if (this.signIn.valid)
    {
      this._AuthService.signIn(this.signIn.value).subscribe((response)=>{
          if(response.message === "success")
          {
            this._Router.navigate(['/profile'])
            localStorage.setItem('TOKEN',response.token)
            this.signIn.reset()

          }
          else 
          {
            this.error = response.message ;
          }

      })
      console.log(this.signIn.value);
      
    }
  }  

 

  ngOnInit(): void {
  }

}
