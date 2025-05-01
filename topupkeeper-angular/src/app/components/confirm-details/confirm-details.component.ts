import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-details',
  imports: [RouterLink],
  templateUrl: './confirm-details.component.html',
  styleUrl: './confirm-details.component.css'
})
export class ConfirmDetailsComponent implements OnInit {


  email: string = '';
  name: string = '';

  paymentMethod: string = 'Credit Card';
  amount: number = 0;
  totalCost: number = 0;
  currency: string = 'USD';

  constructor() { }

  ngOnInit() {
    // Initialization logic here
  }

  onConfirm() {
    // Confirmation logic here
  }



}
