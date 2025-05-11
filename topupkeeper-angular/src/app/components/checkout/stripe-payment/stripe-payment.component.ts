import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CheckoutService } from '../../../services/checkout.service';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    MatButtonModule,
    MatCardModule,

    MatDividerModule,
    MatToolbarModule,
  ],
})
export class StripePaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private readonly checkoutService = inject(CheckoutService);

  paymentForm = this.fb.group({
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#2196f3',
      },
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: true,
      radios: false,
      spacedAccordionItems: false,
    },
  };
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        // lineHeight: '2.8', // makes the element taller'
      },
    },
  };

  // Replace with your own public key
  stripe = injectStripe(this.checkoutService.StripePublicKey);
  paying = signal(false);

  ngOnInit() {
    this.checkoutService
      .createPaymentIntent({
        amount: this.paymentForm.get('amount')!.value,
        currency: 'usd',
      })
      .subscribe((pi) => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      });
  }

  pay() {
    if (this.paying() || this.paymentForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } =
      this.paymentForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }
}

// import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
// import {
//   UntypedFormBuilder,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import {
//   injectStripe,
//   StripeElementsDirective,
//   StripeCardComponent,
// } from 'ngx-stripe';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions,
// } from '@stripe/stripe-js';

// @Component({
//   selector: 'app-stripe-payment',
//   standalone: true,
//   templateUrl: './stripe-payment.component.html',
//   imports: [
//     ReactiveFormsModule,
//     MatInputModule,
//     StripeElementsDirective,
//     StripeCardComponent,
//     MatButtonModule,
//     MatCardModule,
//     MatDividerModule,
//     MatToolbarModule,
//   ],
// })
// export class StripePaymentComponent implements OnInit {
//   @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

//   private readonly fb = inject(UntypedFormBuilder);
//   stripe = injectStripe(
//     'pk_test_51RJupp2fKSXSOX3k1Zniq73ECfe9RUXzLq2Owbky7i0LPIrgnqHbftCwPLr54XdHaDNP3U8SrSJcpFiM7o4XZPxR00GIvaVCel'
//   ); // Replace with actual key

//   paymentForm = this.fb.group({
//     name: ['', [Validators.required]],
//     email: ['', [Validators.required, Validators.email]],
//   });

//   paying = signal(false);

//   cardOptions: StripeCardElementOptions = {
//     style: {
//       base: {
//         iconColor: '#434891',
//         color: '#434891',
//         fontWeight: '300',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSize: '18px',
//         '::placeholder': {
//           color: '#CFD7E0',
//         },
//       },
//     },
//   };

//   elementsOptions: StripeElementsOptions = {
//     locale: 'en',
//   };

//   ngOnInit() {}

//   createToken() {
//     if (this.paying() || this.paymentForm.invalid) return;
//     this.paying.set(true);

//     const name = this.paymentForm.get('name')?.value;

//     this.stripe
//       .createToken(this.cardElement.element, { name })
//       .subscribe((result) => {
//         this.paying.set(false);

//         if (result.token) {
//           console.log('Token created:', result.token.id);
//           alert('Payment token generated successfully.');
//           // Send this token to your server to charge the card
//         } else if (result.error) {
//           console.error(result.error.message);
//           alert('Error: ' + result.error.message);
//         }
//       });
//   }
// }
