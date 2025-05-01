import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { CommonService } from '../../services/common.service';
import { Router, RouterLink } from '@angular/router';
import { InitService } from '../../services/init.service';
import { RechargeService } from '../../services/recharge.service';
import { Recharge } from '../../models/recharge.model';

@Component({
  selector: 'app-index',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  providers: [CommonService],
})
export class IndexComponent implements OnInit {

  private readonly initService = inject(InitService);
  private readonly rechargeService = inject(RechargeService);

  private  rechargeModel: Recharge;


  countries: any[];
  operators: any[];
  selectedAmount:any;
  selectedCountry:any;
  selectedOperator:any;
  phoneNumber:any;
  country:any;
  private readonly commonService: CommonService = inject(CommonService);
  rechargeForm = new FormGroup({
    country: new FormControl('', Validators.required),
    operator: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });


  constructor(private readonly router: Router) {
    this.selectedAmount = null;
    this.selectedCountry = null;
    this.selectedOperator = null;
    this.phoneNumber = null;
    this.country = null;
    this.countries = [];
    this.operators = [
      { id: 1, name: 'MTN' },
      { id: 2, name: 'Orange' },
      { id: 3, name: 'Operator 3' },
    ];
    this.rechargeModel = new Recharge();
    this.rechargeModel.country = 'country';

  }

  ngOnInit(): void {
    console.log('IndexComponent initialized');
    console.log('environment:', environment.apiURL);
    this.loadCountries();

  }

  loadCountries() {
    this.commonService.getCountries().subscribe((data: any[]) => {
      this.countries = data;
      console.log('Countries loaded:', this.countries);
    }
    );
  }


  onRecharge() {
    console.log('Recharge clicked');


    this.rechargeModel.country = this.selectedCountry;
    this.rechargeModel.operator = this.selectedOperator;
    this.rechargeModel.phone = this.phoneNumber;
    this.rechargeModel.amount = this.selectedAmount;
    this.rechargeModel.idClient = 1; // Replace with actual user ID
    this.rechargeModel.status = 'pending'; // Set initial status to 'pending'

    this.router.navigate(['/confirm-details']);

    /*
    this.rechargeService.recharge(this.rechargeModel).subscribe({
      next: (data) => {
        this.rechargeService.setData(data);
        console.log('Recharge successful, data stored!');
        //is it an admin ?
      },
      error: (err) => {
        console.error('Recharge failed:', err);
      },
    });
    */
  }


  getPhoneNumber(phoneValue: any) {
    this.phoneNumber = phoneValue;
    console.log('Selected Amount:', this.selectedAmount);
    console.log('Selected Country:', this.selectedCountry);
    console.log('Selected Operator:', this.selectedOperator);
    console.log('Phone Number:', this.phoneNumber);
    console.log('Country:', this.country);
  }

  checkout() {
    console.log('Checkout clicked');
    console.log('Selected Amount:', this.selectedAmount);
    console.log('Selected Country:', this.selectedCountry);
    console.log('Selected Operator:', this.selectedOperator);
    console.log('Phone Number:', this.phoneNumber);
    console.log('Country:', this.country);
  }


}
