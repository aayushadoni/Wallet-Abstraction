import { error } from 'console';
import {NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SCERET}`, {
  apiVersion: "2024-04-10",
});

export async function POST (req: NextRequest, res: NextResponse){

    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody,sig!,process.env.NEXT_PUBLIC_EndPointSecret!);
    }
    catch(e:any){
        console.error(e);
        return NextResponse.json({error:e.message},{status:400})
    }

    if(event.type =="checkout.session.completed")
    {
        console.log("payment done")

        return NextResponse.json({payment:"Payment successful"},{status:200})
    } else {
        return NextResponse.json({payment:`Unhandled event type ${event.type}`},{status:400})
    }
};
