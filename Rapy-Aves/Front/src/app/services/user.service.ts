import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:3000/api/users"

  constructor(private http: HttpClient) {}

  login(email: string, pass: string){
    return this.http.post(this.apiUrl + "/login", {email: email, password: pass})
  }

  register(email: string, pass: string){
    return this.http.post(this.apiUrl + "/createUsers", {email: email, password: pass})
  }

  getUsers() {
    const headers = new HttpHeaders({
      'Authorization': `key ${localStorage.getItem('token')}`
    });
    return this.http.get(this.apiUrl + "/getUsers", { headers });
  }

  deleteUser(id: string){
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.delete(this.apiUrl + `/deleteUser/${id}`, { headers });
    }
    return null;
  }

  updateUser(id: string, body: any){
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.put(this.apiUrl + `/updateUser/${id}`, body, { headers });
    }
    return null;
  }
  
}
