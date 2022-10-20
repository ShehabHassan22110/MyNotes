import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"" , redirectTo:"sign-in" , pathMatch:"full"},
  {path:"sign-in", component:SignInComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"profile", component:ProfileComponent},
  {path:"navbar", component:NavbarComponent},
  {path:"**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
