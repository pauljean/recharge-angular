import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  NgxPayPalModule,
} from 'ngx-paypal';

@Component({
  selector: 'app-paypal-payment',
  imports: [
    NgxPayPalModule,
    MatButtonModule,
    MatCardModule,

    MatDividerModule,
    MatToolbarModule,
  ],
  templateUrl: './paypal-payment.component.html',
  styleUrl: './paypal-payment.component.css',
})
export class PaypalPaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showCancel: boolean;
  showError: boolean;

  constructor(
    private http: HttpClient // Inject HttpClient for making HTTP requests
  ) {
    this.showCancel = false;
    this.showError = false;
  }

  ngOnInit(): void {
    this.initConfig();
  }

  public initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AdXNBnKYrNylHrul22KX1zuiPKDQ6UrQKCyxkAYfHpr3urMPSj5fjyIXAiK08dqqZogCABmhB2EdxpHu',
      createOrderOnServer: () =>
        this.http
          .post<{ id: string }>('http://localhost:4242/create-paypal-order', {
            amount: 9.99,
          })
          .toPromise()
          .then((res: any) => res.id),
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        shape: 'pill',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        this.initConfig();
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }
}
