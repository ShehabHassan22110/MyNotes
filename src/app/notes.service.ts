import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  basURL = 'https://routeegypt.herokuapp.com/' ;


  constructor(private _HttpClient:HttpClient) {   }

  getAllNotes(data:any):Observable<any>
  {
    return  this._HttpClient.post(this.basURL+'getUserNotes',data)
  }
  addNote(data:any):Observable<any>
  {
    return  this._HttpClient.post(this.basURL+'addNote',data)
  }
  updateNote(data:any):Observable<any>
  {
    return  this._HttpClient.put(this.basURL+'updateNote',data)
  }
  deleteNote(data:any):Observable<any>
  {
    let options= {
      headers: new HttpHeaders({

      }), 
      body : {
          NoteID:data.NoteID , 
          token:data.token 
      }
    }
    return  this._HttpClient.delete(this.basURL+'deleteNote', options)
  }

}
