import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AddRequestComponent } from 'src/app/components-modal/add-request/add-request.component';
import { DriverOrderDetailComponent } from 'src/app/components-modal/driver-order-detail/driver-order-detail.component';
import { Dashboard, Orders } from 'src/app/models/order';
import { Users } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentUser!:Users;
  ActiveSenderColumns: string[] = ['no','ref','name','date','ddate','status','action'];
  ActiveSenderList:Orders[]=[];
  PastSenderList:Orders[]=[];
  NewSenderList:Orders[]=[];
  ActivedataSource = new MatTableDataSource(this.ActiveSenderList);
  PastdataSource = new MatTableDataSource(this.PastSenderList);
  NewdataSource  = new MatTableDataSource(this.NewSenderList); 
  dashboard:Dashboard[] = [];
  projectName:string=environment.projectName;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.currentUser =  Users.getCurrentUser();
    console.log(this.currentUser);
    if(!this.currentUser || this.currentUser.id<1){
      this.router.navigateByUrl('/login');
    } else {
      this.loadDashboard();
      this.loadLists();
      
    }
    
  }
//This code navigates the user to the login page when they log out.
  logout(){
    this.router.navigateByUrl('/login');
  }
//This code is checking the user type and loading the corresponding list (sender or driver) accordingly.
  loadLists(){

    if(this.currentUser.type==1){
      this.loadSenderList();
    } else if(this.currentUser.type==2){
      this.loadDriverList();
    }
  }
//Opens a dialog window with a specified width, and reloads the list when the window is closed.
  addRequest(){
    const dialogRef = this.dialog.open(AddRequestComponent, {
     // data: {name: this.name, animal: this.animal},
     width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: { reload: any; }) => {
      if(result.reload){
        this.loadLists();
      }
    });
  }

//This code is loading data from an API and filtering it into two categories based on order status.
  loadSenderList(){
    this.api.loadData({}).subscribe(res=>{
      if(res.success){
        let result = res.data;
        if(result){
          this.ActiveSenderList = result.filter((x: { order_status: number; })=>x.order_status!=0);
          this.PastSenderList = result.filter((x: { order_status: number; })=>x.order_status==0);
          this.ActivedataSource.data =  this.ActiveSenderList;
          this.PastdataSource.data =  this.PastSenderList;
        }
        
      }
     
    });
  }
//This code is loading the dashboard data from an API and assigning it to the dashboard variable if the response is successful.
  loadDashboard(){
    this.api.loadDashboard(this.currentUser).subscribe(res=>{
      if(res.success){
        this.dashboard = res.data;
      }
    });
  }
// Loads data from an API and filters it based on driver_id and order_status.
  loadDriverList(){
    this.api.loadData({}).subscribe(res=>{
      if(res.success){
        let result = res.data;
        if(result){
          this.ActiveSenderList = result.filter((x: {driver_id: number; order_status: number; })=>x.order_status!=0 && x.driver_id==this.currentUser.id);
          this.PastSenderList = result.filter((x: {driver_id: number; order_status: number; })=>x.order_status==0 && x.driver_id==this.currentUser.id);
          this.NewSenderList = result.filter((x: {driver_id: number; order_status: number; })=>x.order_status==1);
          this.ActivedataSource.data =  this.ActiveSenderList;
          this.PastdataSource.data =  this.PastSenderList;
          this.NewdataSource.data =  this.NewSenderList;
        }
        
      }
     
    });
  }

//This code is opening a dialog box with the given data and width, and reloading the list after the dialog is closed.
  viewDetails(id:string){
    const dialogRef = this.dialog.open(DriverOrderDetailComponent, {
      data: {id: id},
     width: '600px',
     disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: { reload: any; }) => {
      if(result.reload){
        this.loadLists();
      }
    });
  }
//This code is formatting a date string in the format "YYYY-MM-DD" to "DD-MM-YYYY" if it is valid.
  formatDate(date:string){
    if(!moment(date,"YYYY-MM-DD").isValid()){
      return " - ";
    }
    return moment(date,"YYYY-MM-DD").format("DD-MM-YYYY");
    
  }
}
