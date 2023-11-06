/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAuthPaypalRequest } from '$lib/utils';

const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';

enum PaypalStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

export async function POST(event) {
  const body = await event.request.text();
  const getPaypalInfoConfig = {
    method: 'get',
    url: `${PAYPAL_API_URL}/v2/checkout/orders/${data.paypalCheckoutId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const supabase = event.locals.supabase;

  let getDataFromPaypal = (await makeAuthPaypalRequest(getPaypalInfoConfig)) as any;
  const paypalStatus = getDataFromPaypal.data.status;

  if (paypalStatus === 'APPROVED') {
    const captureConfig = {
      method: 'post',
      url: `${PAYPAL_API_URL}/v2/checkout/orders/${body.paypalCheckoutId}/capture`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const paypalResponse = (await makeAuthPaypalRequest(captureConfig)) as any;
    if (paypalResponse.data.status !== 'COMPLETED') {
      throw new Error('Paypal deposit is not confirmed');
    }

    getDataFromPaypal = await makeAuthPaypalRequest(getPaypalInfoConfig);
  } else if (paypalStatus !== 'COMPLETED') {
    throw new Error('Paypal deposit is not confirmed');
  }

  // Either completed or approved and then completed

  const boosting = await supabase
    .from('boost_requests')
    .update({ status: PaypalStatus.Completed })
    .eq('paypalCheckoutId', body.paypalCheckoutId)
    .select('*');

  if (!boosting || !boosting.data || !boosting?.data[0]) {
    throw new Error('Boosting record does not exist');
  }

  await supabase
    .from('property_for_sale')
    .update({ valuePaidForBoosting: boosting.data[0].amount });

  return boosting;
}
