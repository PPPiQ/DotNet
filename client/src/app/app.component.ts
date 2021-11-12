import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe(
      response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }

  setCurrentUser() {
    let localStorageUser: string | null = localStorage.getItem('user');
    if (localStorageUser) {
      const user: User = JSON.parse(localStorageUser);
      this.accountService.setCurrentUser(user);
    }
  }
}
