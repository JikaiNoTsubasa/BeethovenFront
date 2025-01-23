import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/database/dto/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class BeeService {

  host = 'http://localhost:5088';

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string):Observable<ResponseLogin> {
    let data = new FormData();
    data.append('email', username);
    data.append('password', password);
    return this.http.post<ResponseLogin>(`${this.host}/api/login`, data);
  }
}
