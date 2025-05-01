import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  StripePublicKey = 'pk_test_51N1v0aK2r7x4jX3J6g5Q9Zk8z4Y5f3h4d4f4d4f4d4f4f4f4f4f4f4f4f4f4f4f4';

  constructor() { }

  createPaymentIntent(arg0: { amount: any; currency: string; }): Observable<any>  {
    throw new Error('Method not implemented.');
  }

  pay(): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
