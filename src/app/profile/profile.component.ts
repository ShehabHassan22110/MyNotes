import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from "jwt-decode";
import { AuthService } from '../auth.service';
import { NotesService } from '../notes.service';

declare var $ :any ;
$(function () {
  $('[data-toggle="popover"]').popover()
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

 
  AllNotes:any  ;
  token:any ;
  decoded:any ;
   

  constructor(private _Router:Router , private _NotesService:NotesService , private _AuthService:AuthService) {



    this.token =localStorage.getItem('TOKEN') ;
    this.decoded = jwtDecode(this.token);

 
    // console.log(this.decoded);
    
    if(!localStorage.getItem('TOKEN'))
    {
      this._Router.navigate(['/signin'])
    }
    this.getAllNotes() 

  }
    AddNote:FormGroup = new FormGroup({
      title: new FormControl(null ,[Validators.required]) , 
      desc: new FormControl(null, [Validators.required]) , 
    })
    
      
 

    getAllNotes()
    {
      let data = {token:this.token,userID:this.decoded._id}

    
      this._NotesService.getAllNotes(data).subscribe((res)=>{
        console.log(res);
        this.AllNotes=res.Notes 
        
      
      })
    }
   

   submitAddNote()
   {
  let data =
  {
    title :this.AddNote.value.title ,
    desc  :this.AddNote.value.desc ,
    token :this.token ,
    citizenID : this.decoded._id 
  }
  this._NotesService.addNote(data).subscribe((ress)=>{
    // console.log(ress);
    if(ress.message=='success')
    {
      $('#AddNote').modal('hide')
      this.getAllNotes()  
      this.AddNote.reset()
    }
    
  })
  // console.log(this.AddNote.value);


   }
   //------------------------------delete note -------------------------------
   NOTE_ID:any ;
   getID(id:any)
   {
     this.NOTE_ID = id ;
     console.log(id);
     
   }
   deleteNote()
   {
     let data = {NoteID : this.NOTE_ID   ,      token :this.token }

     this._NotesService.deleteNote(data).subscribe((deleteResponse)=>{
       console.log(deleteResponse);
       if(deleteResponse.message=='deleted')
       {
        $('#DeleteNote').modal('hide')
        this.getAllNotes() 
       }
       
     })
   }


//------------------------------delete note -------------------------------
   setValue()
   {
     for (let index = 0; index < this.AllNotes.length; index++) 
     {
        if(this.AllNotes[index]._id==this.NOTE_ID)
        {
          console.log(this.AllNotes[index]);
          this.AddNote.controls.title.setValue(this.AllNotes[index].title)
          this.AddNote.controls.desc.setValue(this.AllNotes[index].desc)
          
        }  
     }
   }

   editNote()
   {
     let data = {
       title:this.AddNote.value.title ,
       desc:this.AddNote.value.desc,
       NoteID : this.NOTE_ID,
       token :this.token
     }
     this._NotesService.updateNote(data).subscribe((res)=>{
       console.log(res);
       if(res.message=='updated')
       {
        $('#EditNote').modal('hide')
        this.getAllNotes() 
       }
       
       
     })
   }
//------------------------------ log out -------------------------------
  //  isLogOut()
  //  {
  //    this._AuthService.logOut() ;
  //  }


  ngOnInit(): void {
  }

}
