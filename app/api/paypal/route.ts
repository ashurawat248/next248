
import { NextResponse } from 'next/server';
import { client } from '../../../lib/paypal';
import { db } from '../../../lib/prismadb'; // Assuming you have a Prisma client setup
import * as paypal from '@paypal/checkout-server-sdk'; // Import PayPal SDK


export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token'); // Extract token from query params
    const userId = searchParams.get('userId');
    const planType = searchParams.get('planType');
    console.log(userId, token, 'sss')
    // const {token, userId} = await req.json()
    
    if(!token ||!userId) {
    return NextResponse.json("Unauthorized", {status: 401})
    }
    
    const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
    const captureResponse = await client.execute(captureRequest);
    
    console.log(captureResponse.result.purchase_units, 'desccp')
    
    if (captureResponse.result.status === 'COMPLETED') {
    const purchaseUnits = captureResponse.result.purchase_units;
    
    console.log(purchaseUnits, 'Purchase Units');
    // const expirationDate = new Date();
    if(purchaseUnits && purchaseUnits.length > 0) {
    const plans = {
    BASIC: { price: "20.00", duration: 30 },
    STANDARD: { price: "40.00", duration: 60 },
    PREMIUM: { price: "60.00", duration: 85 },
    };
    const selectedPlan = plans[planType];
    if (!selectedPlan) {
    return NextResponse.json('Invalid plan type', { status: 402 });
    }
    console.log(selectedPlan, 'desc')
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + selectedPlan.duration);
    
    const activePlans = await db.purchase.findMany({
    where: { userId, isActive: true }
    });
    
    const isAlreadyPurchased = activePlans.some(plan => plan.planType === planType);
    if (isAlreadyPurchased) {
    return NextResponse.json('User already has this plan active', { status: 400 });
    }
    
    const newPurchase = await db.purchase.create({
      data: {
      userId,
      planType,
      expirationDate,
      isActive: true,
      },
    });

    setTimeout(async () => {
    await db.purchase.update({
       where: {
      userId,
      isActive: true,
      expirationDate: { lte: new Date() },
     },
     data: {
      isActive: false,
      },
    });
    }, selectedPlan.duration * 24 * 60 * 60 * 1000);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/success?payment=completed`)
    // const response = NextResponse.json({ success: true, newPurchase });
    // response.headers.set('Location', `${process.env.NEXT_PUBLIC_APP_URL}/success?payment=completed`);
    // return response;
    }else {
    return NextResponse.json('Invalid purchase units', { status: 402 });
    }
}
}
