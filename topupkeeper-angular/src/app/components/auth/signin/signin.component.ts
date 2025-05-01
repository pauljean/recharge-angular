import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit() {
    if (this.authenticationService.isSignedIn()) {
      //this.router.navigate(['/']);
    }
  }

  onSignin() {
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email')?.value as string;
      const password = this.signinForm.get('password')?.value as string;
      this.authenticationService.signin({ email, password }).subscribe({
        next: (data) => {
          this.authenticationService.setToken(data.accessToken);
          console.log('Login successful, token stored!');
          //is it an admin ?
          if (this.authenticationService.getRoles().includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    }
  }

}
