import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signout',
  imports: [ReactiveFormsModule],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {

  signinForm = new FormGroup({
    email: new FormControl('', Validators.required), //, Validators.email
    password: new FormControl('', Validators.required),
  });

  private readonly authenticationService = inject(AuthenticationService);

  constructor(private readonly router: Router) {}


  ngOnInit(): void {
    if (this.authenticationService.isSignedIn()) {
      //this.router.navigate(['/']);
    }
  }


  onSubmit() {
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email')?.value as string;
      const password = this.signinForm.get('password')?.value as string;
      this.authenticationService.signin({ email, password }).subscribe({
        next: (data) => {
          this.authenticationService.setToken(data.token);
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
