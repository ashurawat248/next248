import {client}  from "@/lib/paypal"

import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";



export async function POST(req:Request){
    const {userId, planType} = await req.json()
    // const userId = user?.newUser?._id
    console.log(userId, planType, 'usee')
    
    if( !userId || !planType) {
            return NextResponse.json("Unauthorized", { status: 401})
        }

        const plans = { 
          BASIC: { price: "20.00", duration: 30 }, 
          STANDARD: { price: "40.00", duration: 60 }, 
          PREMIUM: { price: "60.00", duration: 85 }, 
        };

        const selectedPlan = plans[planType];
        if(!selectedPlan){
          return NextResponse.json('Invalid plan type', {status: 402})
        }

        console.log(selectedPlan, 'workking')

        // const expirationDate = new Date
        // expirationDate.setDate(expirationDate.getDate() + selectedPlan.duration);

        const orderRequest = new paypal.orders.OrdersCreateRequest();
        
        
        
        orderRequest.headers["Prefer"] = "return=representation";
        orderRequest.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: selectedPlan.price, // Total price
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: selectedPlan.price, // Item total breakdown
                  },
                },
              },
             description: `${planType} Plan Subscription`,
             custom_id: String(planType),
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paypal?userId=${userId}&planType=${planType}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=1`,
            shipping_preference: "NO_SHIPPING",
          },
        });
        
        try {
        const response = await client.execute(orderRequest); // This is a PayPalHttpClient response
        const order = response.result;
        console.log(order, 'order')

       if(order && order.status === 'CREATED') {

        const approvalUrl = order.links.find((link) => link.rel === 'approve')?.href;
        
        if (!approvalUrl) {
          return NextResponse.json({ success: false, message: 'Approval URL not found' });
        }

      return NextResponse.json({ success: true, approvalUrl, order });
        }else {
          return NextResponse.json({ success: false, message: 'Approval URL not found' });
        }

} catch (error) {
  console.log(error)
  return NextResponse.json(`Something went ${error} wrong`, {status: 500})
}
}

