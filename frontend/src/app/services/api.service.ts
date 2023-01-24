import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponse } from '../models/api-response';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly controller = 'fdbapi/';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  public showSuccessSnackBar(message: string) {
    return this.snackBar.open(message, 'Close',
      {
        panelClass: 'successSnackBar',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      });
  }
  public showErrorSnackBar(message: string) {
    return this.snackBar.open(message, 'Close',
      {
        panelClass: 'errorSnackBar',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      });
  }
  login(data:any) {
    return this.http.post<APIResponse>(this.controller + 'login',data);
  }
  addRequest(data:any) {
    return this.http.post<APIResponse>(this.controller + 'add-request',data);
  }
  loadData(data:any) {
    return this.http.post<APIResponse>(this.controller + 'load-data',data);
  }
  loadDetails(data:any) {
    return this.http.post<APIResponse>(this.controller + 'load-details',data);
  }
  updateDetails(data:any) {
    return this.http.post<APIResponse>(this.controller + 'update-details',data);
  }
  loadDashboard(data:any) {
    return this.http.post<APIResponse>(this.controller + 'load-dashboard',data);
  }
}
