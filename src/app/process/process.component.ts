import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
interface User {
  email: string
  firstname: string
  lastname: string
  password: string
  phone: string
  status: string
  userId: number | string
  username: string
}

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})


export class ProcessComponent implements OnInit {
  popup = false;
  update = false;
  items: User[] | undefined;
  headers: string[] = ['User ID','Delete', 'Username', 'Firstname', 'Lastname', 'Email', 'Password', 'Phone','Status','Edit'];


  id: string | number = '';
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phone = '';
  status = '';

  cid: string | number = '';
  cusername = '';
  cfirstName = '';
  clastName = '';
  cemail = '';
  cpassword = '';
  cphone = '';
  cstatus = '';

  nameUpdate = '';

  currentItemNeededUpdate: number| undefined;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.logdata();
  }


  logdata(): void {
    this.getAll().subscribe(e => {
      this.items = e;
      console.log(e);
    })
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://10.1.20.16:9999/api/users')
  }


  onDeleteItem(username:string): void {
    if(this.items !== undefined){
      this.items = this.items.filter((item) => (item.username !== username));
      this.deleteAnItem(username).subscribe(e => {
      console.log(e);
    })
    }
  }
  deleteAnItem(username:string):Observable<any> {
    return this.http.delete(`http://10.1.20.16:9999/api/users/${username}`)
  }


  onCreate(): void {
    const body = {
      id: this.cid,
      username: this.cusername,
      firstname: this.cfirstName,
      lastname: this.clastName,
      email: this.cemail,
      password: this.cpassword,
      phone: this.cphone,
      status: this.cstatus,
    }
    this.createAnItem(body).subscribe(e => {
      console.log(e);
      if(e){
        this.popup = false;
        this.logdata();
      }
    })
  }
  createAnItem(body:any):Observable<any>{
    return this.http.post<any>(
      'http://10.1.20.16:9999/api/users',
      body, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  openPopup(item: User): void {
    console.log(item);
    this.update = !this.update;
    this.nameUpdate = item.username;
    this.username = item.username    
    this.firstName = item.firstname
    this.lastName = item.lastname
    this.email = item.email
    this.password = item.password
    this.phone = item.phone
    this.status = item.status
    this.id = item.userId
  }

  onUpdate(): void {
    const body = {
      id: this.id,
      username: this.username,
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      status: this.status,
    }
    this.updateAnItem(this.nameUpdate, body).subscribe(r => {
      if(r) {
        this.update = false;
        this.logdata()
      }
    
    }, er => {
      console.log('update fail', er);
      
    })
  }
  updateAnItem(username: string, body: any): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`http://10.1.20.16:9999/api/users/${username}`, body)
  }

}

