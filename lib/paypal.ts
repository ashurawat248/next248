import paypal from '@paypal/checkout-server-sdk';

// This should switch between sandbox and live depending on your environment.
const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
      process.env.PAYPAL_SECRET_KEY as string
    )
  : new paypal.core.SandboxEnvironment(
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
      process.env.PAYPAL_SECRET_KEY as string
    );

  export const client = new paypal.core.PayPalHttpClient(environment);
    
    // import checkoutNodeJssdk from '@paypal/checkout-server-sdk'
    
    // const configureEnvironment = function () {
    //   const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
    //   const clientSecret = process.env.PAYPAL_SECRET_KEY as string
    
    //   return process.env.NODE_ENV === 'production'
    //     ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    //     : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
    // }
    
    // const client = function () {
    //   return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment())
    // }
    
    // export default client