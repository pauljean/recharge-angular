export class StripePayment {

  token: string | undefined;
  description: string | undefined;
  amount: number = 0;
  currency: string | undefined;
}
