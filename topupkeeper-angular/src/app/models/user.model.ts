export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  operator: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, email: string, phone: string, country: string, operator: string, amount: number, status: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.country = country;
    this.operator = operator;
    this.amount = amount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
