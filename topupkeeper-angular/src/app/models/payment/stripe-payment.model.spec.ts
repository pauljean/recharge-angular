import { StripePayment } from './stripe-payment.model';

describe('StripePayment', () => {
  it('should create an instance', () => {
    expect(new StripePayment()).toBeTruthy();
  });
});
