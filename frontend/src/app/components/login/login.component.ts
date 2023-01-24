import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usersLogin!:Users;
  currentUser = new Users();
  projectName:string=environment.projectName;
  constructor(
    public api:ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    Users.removeFromLocalStorage();
    this.usersLogin = new Users();
  }
//This code is logging in a user by calling the login API and saving the user data to local storage if successful, then navigating to the dashboard.
  login(){
    this.api.login(this.usersLogin).subscribe(res=>{
      if(res.success){
        this.currentUser = res.data;
        Users.saveToLocalStorage(this.currentUser);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.api.showErrorSnackBar(res.data.message);
      }
     
    });
  }
}
