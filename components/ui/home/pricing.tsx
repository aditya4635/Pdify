"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import {cn} from '@/lib/utils';
import { ArrowRight, CheckIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
const plans=[{
    id:'basic',
    name:'Basic',
    price: 9 ,
    items:['5 summaries per month',
        'standard processing',
        'email support',
    ],
    paymentLink:'',
    priceId:'plan_basic_replace_me',
    description:"for personal use ",
},
{
    id:'pro',
    name:'pro',
    price: 19,
    description: 'for professionals and teams',
    items:[
        'unlimited PDF summaries',
        'prioroty processing',
        '24/7 priority support',
        'markdown export',
    ],
    paymentLink:'',
    priceId:'plan_pro_replace_me',
},];

// Add Razorpay typing for window
declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};
type PriceType={
    name:string;
    price:number;
    description:string;
    items: string[];
    id:string;
    paymentLink:string;
    priceId:string;

}; 
const PricingCard = ({
    name,
    price,
    description,
    items,
    id,
    paymentLink,
    priceId
}:PriceType) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setIsLoading(true);

            // Load Razorpay script
            const res = await loadRazorpayScript();
            if (!res) {
                toast.error("Razorpay SDK failed to load. Are you online?");
                setIsLoading(false);
                return;
            }

            const response = await fetch('/api/razorpay/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId: priceId }),
            });

            if (!response.ok) {
                if(response.status === 401) {
                    toast.error("Please sign in to continue");
                    return;
                }
                throw new Error("Checkout failed");
            }

            const data = await response.json();
            
            // Initialization options for Razorpay Checkout
            const options = {
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: "Adiya PDF Summaries",
                description: `${name} Subscription`,
                handler: function (response: any) {
                    // This function fires upon successful payment
                    toast.success("Payment successful! Welcome to the new plan!");
                    // Optionally redirect or update user state
                    window.location.href = "/dashboard";
                },
                theme: {
                    color: "#000000",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Checkout error:', error);
            toast.error("Failed to process checkout. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
   
   <div className='relative w-full max-w-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300'>
        <div className={cn('flex flex-col h-full bg-white dark:bg-zinc-950 rounded-[2rem] p-8 border border-gray-200 dark:border-zinc-800', id==='pro' ? 'shadow-xl ring-2 ring-black dark:ring-white scale-105' : 'shadow-sm')}> 
            <div className='flex flex-col gap-2 mb-6'>
                <p className='text-xl capitalize font-extrabold text-gray-900 dark:text-white'>{name}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400 h-10'>
                {description}
                </p>
            </div>
        
            <div className='flex gap-2 mb-8'>
                <p className='text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white'>${price}</p>
                <div className='flex flex-col justify-end mb-1'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>/month</p>
                </div>
            </div>
         
            <ul className='space-y-4 flex-1 mb-8'>
            {items.map((item, index)=> (
                <li key={index} className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                    <CheckIcon size={20} className='text-gray-900 dark:text-white shrink-0 mt-0.5' />
                    <span className="text-sm">{item}</span>
                </li>
            ))}
            </ul>
            <div className='flex justify-center w-full mt-auto'>
                <button 
                  onClick={handleCheckout} 
                  disabled={isLoading}
                  className={cn('w-full rounded-xl flex items-center justify-center gap-2 font-bold py-4 transition-colors',
                id==='pro'? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200': 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700', isLoading && 'opacity-70 cursor-not-allowed')}>
                   {isLoading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <>Buy Now <ArrowRight size={18} /></>}
                </button>
            </div>
        </div>
    </div>
    );
};
const Pricing = () => {
  return (
    <section className='relative overflow-hidden bg-white dark:bg-zinc-950 py-16 lg:py-24' id='pricing'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'> 
        <div className='flex flex-col items-center justify-center w-full pb-16 text-center'>
            <h2 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100'>Simple, transparent pricing</h2>
            <p className='mt-4 text-xl text-gray-600 dark:text-gray-400'>Choose the plan that's right for you</p>
        </div>
        <div className='relative flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto'>
           {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
            ))}
        </div>
        </div>
    </section>
  )
}

export default Pricing
