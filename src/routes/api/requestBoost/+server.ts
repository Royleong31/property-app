/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAuthPaypalRequest } from '$lib/utils';

const DEPOSIT_REFERENCE_ID = 'DEPOSIT_REFERENCE_ID';

const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';
enum PaypalStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

export async function POST(event) {
  const body = await event.request.text();
  console.log(body);
  const supabase = event.locals.supabase;
  let depositId = '';

  const deposit = await supabase
    .from('boost_requests')
    .insert({
      amount: +body.amount.toFixed(2),
      currency: 'SGD',
      propertyId: body.propertyId,
      status: PaypalStatus.Pending,
      paypalCheckoutId: null,
    })
    .select('*');

  depositId = deposit.data[0].id;

  const requestBody = JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: DEPOSIT_REFERENCE_ID,
        custom_id: deposit.id,
        description: 'Deposit into Home Price',
        amount: {
          currency_code: 'SGD',
          value: deposit.amount.toFixed(2),
        },
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
          brand_name: 'Home Price Pte. Ltd.',
          shipping_preference: 'NO_SHIPPING',
          locale: 'en-US',
          landing_page: 'LOGIN',
          user_action: 'PAY_NOW',
          return_url: 'https://property-app-sc2006.vercel.app/',
          cancel_url: 'https://property-app-sc2006.vercel.app/',
        },
      },
    },
  });

  const config = {
    method: 'post',
    url: `${PAYPAL_API_URL}/v2/checkout/orders`,
    headers: {
      'Content-Type': 'application/json',
      'Paypal-Request-Id': deposit.id,
    },
    data: requestBody,
  };

  const paypalResponse = await makeAuthPaypalRequest(config);
  const paypalCheckoutId = (paypalResponse as any).data.id;

  const updateDeposit = await supabase
    .from('boost_requests')
    .update({ paypalCheckoutId, status: PaypalStatus.Pending, amount: +body.amount.toFixed(2) })
    .eq('id', depositId)
    .select('*');

  return new Response({
    ...updateDeposit.raw[0],
  });
}
