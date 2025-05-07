import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StripePayment } from '../models/payment/stripe-payment.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  StripePublicKey = 'pk_test_51RJupp2fKSXSOX3k1Zniq73ECfe9RUXzLq2Owbky7i0LPIrgnqHbftCwPLr54XdHaDNP3U8SrSJcpFiM7o4XZPxR00GIvaVCel';

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  createPaymentIntent(data: { amount: any; currency: string; }): Observable<any>  {
   return  this.http.post<PaymentIntent>(
      `${environment.apiURL}/payment/payment-intent`, data,
   );

  }

  pay(stripePaymentModel: StripePayment): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
