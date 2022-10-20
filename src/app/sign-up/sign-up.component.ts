import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isClicked = false 
  error:string = "";

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  signUp:FormGroup = new FormGroup ({
    first_name : new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    last_name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    age : new FormControl(null , [Validators.required , Validators.min(12) , Validators.max(100)] ),
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern('^[a-zA-Z0-9]{3,10}$')])
  })

  submitSignUp()
  {
    this.isClicked= true ;
     if (this.signUp.valid ) {
       // console.log(this.signUp.value);
       this._AuthService.signUp(this.signUp.value).subscribe((response)=>{
         if (response.message=='success')
         {
          this._Router.navigate(['/sign-in'])
           this.signUp.reset()
         }
         else
         {
           this.error = response.message; 
         }
         console.log(response);

       })

     }
   
 }
  ngOnInit(): void {
  }

}
