import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:3000/api/products"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> | null {
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.get(this.apiUrl + '/getProducts', { headers });
    }
    return null;
  }

  getProductsCategory(category: string): Observable<any> | null{
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.get(this.apiUrl + `/getProductsCategory/${category}`, { headers });
    }
    return null;
  }

  createProduct(body: any): Observable<any> | null{
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.post(this.apiUrl + `/createProducts`, body, { headers });
    }
    return null;
  }

  deleteProduct(id: string){
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.delete(this.apiUrl + `/deleteProducts/${id}`, { headers });
    }
    return null;
  }

  updateProduct(id: string, body: any){
    if(localStorage){
      const headers = new HttpHeaders({
        'Authorization': `key ${localStorage.getItem('token')}`
      });
      return this.http.put(this.apiUrl + `/updateProduct/${id}`, body, { headers });
    }
    return null;
  }
}
