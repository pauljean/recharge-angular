import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StripePaymentComponent } from "./stripe-payment/stripe-payment.component";
import { PaypalPaymentComponent } from "./paypal-payment/paypal-payment.component";

@Component({
  selector: 'app-checkout',
  imports: [StripePaymentComponent, PaypalPaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
paymentMethod = 'stripe';

}
