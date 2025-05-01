import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
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

onSignup() {
  if (this.signupForm.valid) {

    const nom = this.signupForm.get('nom')?.value as string;
    const prenom = this.signupForm.get('prenom')?.value as string;
    const email = this.signupForm.get('email')?.value as string;
    const password = this.signupForm.get('password')?.value as string;
    this.authenticationService.signup({nom, prenom,  email, password }).subscribe({
      next: (data) => {
        this.authenticationService.setToken(data.accessToken);
        console.log('Signup successful, token stored!');
        //is it an admin ?
        if (this.authenticationService.getRoles().includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
      },
    });
  }
  }

}
