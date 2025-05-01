import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule, StripeCardComponent, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { MatInputModule } from '@angular/material/input';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stripe-payment',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, NgxStripeModule],
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StripePaymentComponent implements OnInit {


  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
    },
  };

public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

paymentForm!: FormGroup;
payment_method: any;


  constructor(private readonly http: HttpClient,
    private readonly fb: FormBuilder,
    private readonly stripeService: StripeService) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      name: ['John Doe', [Validators.required]],
      email: ['john@gmail.com', [Validators.required]],
      amount: [100, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }

  get validForm() {
    return this.paymentForm.valid && this.stripeCardValid;
  }

  pay(): void {
    if (this.paymentForm.valid) {
      this.createPaymentIntent(this.paymentForm.get('amount')?.value || 0)
        .pipe(
          switchMap((pi:any) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.paymentForm.get('name')?.value || '',
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.paymentForm);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.apiURL}/payment/payment-intent`,
      { amount }
    );
  }

}
