import qs from 'qs';
import axios, * as axios_1 from 'axios';

const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';
// if the access token is invalid, get a new one and retry the request, and cache the new access token
export async function makeAuthPaypalRequest(config: axios_1.AxiosRequestConfig) {
  try {
    const accessToken = await fetchPaypalAccessToken();
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const paypalResponse = await axios.request(newConfig);

    return paypalResponse;
  } catch (error) {
    return error;
  }
}

async function fetchPaypalAccessToken(): Promise<string> {
  try {
    const result = await axios.post(
      `${PAYPAL_API_URL}/v1/oauth2/token`,
      qs.stringify({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
          ).toString('base64')}`,
        },
      },
    );

    return result.data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to get PayPal access token');
  }
}
