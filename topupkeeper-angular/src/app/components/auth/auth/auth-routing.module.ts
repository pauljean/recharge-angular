import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { SignoutComponent } from '../signout/signout.component';
import { PasswordComponent } from '../password/password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signout',
        component: SignoutComponent, // Assuming you want to use the same component for signout
      },
      {
        path: 'forgot-password',
        component: PasswordComponent, // Assuming you want to use the same component for forgot password
      },
      {
        path: 'reset-password',
        component: PasswordComponent, // Assuming you want to use the same component for reset password
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
