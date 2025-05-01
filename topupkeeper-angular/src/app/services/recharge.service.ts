import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {


  private readonly BASE_URL: string = environment.apiURL;

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }


  // Method to recharge a user's account
  recharge(rechargeForm: any): Observable<any> {
    // Logic to recharge the account
    console.log(`Recharging account of user ${rechargeForm.userId} with amount ${rechargeForm.amount}`);

    return this.http.post(this.BASE_URL + "/mobile/recharge", rechargeForm)
  }

  setData(data: any) {
    //throw new Error('Method not implemented.');
  }

  getRechargeHistory(userId: number): void {
    // Logic to get the recharge history
    console.log(`Getting recharge history for user ${userId}`);
  }
  // Method to cancel a recharge
  cancelRecharge(rechargeId: number): void {
    // Logic to cancel the recharge
    console.log(`Cancelling recharge with ID ${rechargeId}`);
  }

  // Method to get the status of a recharge
  getRechargeStatus(rechargeId: number): void {
    // Logic to get the status of the recharge
    console.log(`Getting status of recharge with ID ${rechargeId}`);
  }


}
