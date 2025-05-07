import {
  Component,
  OnInit
} from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  NgxPayPalModule
} from 'ngx-paypal';

@Component({
  selector: 'app-paypal-payment',
  imports: [NgxPayPalModule],
  templateUrl: './paypal-payment.component.html',
  styleUrl: './paypal-payment.component.css'

})
export class PaypalPaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  showCancel: boolean;
  showError: boolean;

  constructor() {
      this.showCancel = false;
      this.showError = false;
  }

  ngOnInit(): void {
      this.initConfig();
  }

  private initConfig(): void {
      this.payPalConfig = {
          clientId: 'sb',
          // for creating orders (transactions) on server see
          // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
          createOrderOnServer: (data) => fetch('/my-server/create-paypal-transaction')
              .then((res) => res.json())
              .then((order) => data.orderID),
          authorizeOnServer: (approveData) => {
              return fetch('/my-server/authorize-paypal-transaction', {
              body: JSON.stringify({
                orderID: approveData.orderID
              })
            }).then((res) => {
              return res.json();
            }).then((details) => {
              alert('Authorization created for ' + details.payer_given_name);
            });
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.showCancel = true;
          },
          onError: err => {
              console.log('OnError', err);
              this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
              this.resetStatus();
          },
      };
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }
}
