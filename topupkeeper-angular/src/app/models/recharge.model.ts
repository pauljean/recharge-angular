export class Recharge {
  idClient: number;
  phone: string;
  country: string;
  operator: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.idClient = 0;
    this.phone = '';
    this.country = '';
    this.operator = '';
    this.amount = 0;
    this.status = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}
