import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/database/dto/ResponseLogin';
import { User } from '../models/database/User';
import { ApiResponse } from '../models/database/ApiResponse';
import { Ticket } from '../models/database/Ticket';
import { Product } from '../models/database/Product';
import { TicketType } from '../models/database/TicketType';
import { Priority } from '../models/database/Priority';
import { Customer } from '../models/database/Customer';
import { Message } from '../models/database/Message';

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

  //#region User
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/api/users`);
  }

  getMyUser(): Observable<User> {
    return this.http.get<User>(`${this.host}/api/myuser`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.host}/api/user/${id}`);
  }
  //#endregion

  //#region Ticket
  getTicketsFull(): Observable<HttpResponse<Ticket[]>> {
    return this.http.get<Ticket[]>(`${this.host}/api/tickets`, {observe: 'response'});
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.host}/api/tickets`);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.host}/api/ticket/${id}`);
  }

  getTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${this.host}/api/tickettypes`);
  }

  createTicket(
      name: string, 
      description: string, 
      assignedToId: number,
      reviewedById: number,
      productId: number,
      gitlabId: number,
      typeId: number,
      priorityId: number
    ): Observable<Ticket> {
    let data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('assignedToId', assignedToId.toString());
    data.append('productId', productId.toString());
    data.append('reviewedById', reviewedById.toString());
    data.append('gitlabTicketId', gitlabId.toString());
    data.append('typeId', typeId.toString());
    data.append('priorityId', priorityId.toString());
    return this.http.post<Ticket>(`${this.host}/api/ticket`, data);
  }
  //#endregion

  //#region Customer
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/api/customers`);
  }

  //#endregion

  //#region Product
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/api/products`);
  }
  //#endregion

  //#region Priority
  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.host}/api/priorities`);
  }
  //#endregion

  //#region Messages
  getMyMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.host}/api/mymessages`);
  }
  //#endregion
}
