import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthComponent } from './components/auth/auth.component';
import { GiftComponent } from './components/gift/gift.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BillComponent } from './components/bill/bill.component';
import { HelpComponent } from './components/help/help.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SignoutComponent } from './components/auth/signout/signout.component';
import { PasswordComponent } from './components/auth/password/password.component';
import { PaypalPaymentComponent } from './components/checkout/paypal-payment/paypal-payment.component';
import { StripePaymentComponent } from './components/checkout/stripe-payment/stripe-payment.component';
import { ConfirmDetailsComponent } from './components/confirm-details/confirm-details.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'

  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
        },
        {
          path: 'signin',
          component: SigninComponent,
        },
        {
          path: 'signup',
          component: SignupComponent
        },
        {
          path: 'signout',
          component: SignoutComponent // Assuming you want to use the same component for signout
        },
        {
          path: 'forgot-password',
          component: PasswordComponent // Assuming you want to use the same component for forgot password
        },
        {
          path: 'reset-password',
          component: PasswordComponent // Assuming you want to use the same component for reset password
        }
      ]
  },
  {
    path: 'gift',
    component: GiftComponent
  },
  {
    path: 'confirm-details',
    component: ConfirmDetailsComponent

  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children   : [
      {
        path : 'stripe-payment',
        component : StripePaymentComponent
      },
      {
        path : 'paypal-payment',
        component : PaypalPaymentComponent
      }
    ]
  },
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '**',
    component: ErrorComponent // This should be a 404 component
  }
];
