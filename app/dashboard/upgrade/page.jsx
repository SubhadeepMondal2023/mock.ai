'use client'
import React from 'react';

const PricingPlan = [
  {
    duration: 'Free',
    price: '0.00',
    features: {
      "10 users included": false,
      "2GB of storage": false,
      "Email support": false,
      "Help center access": true
    },
    link: "/dashboard",
    newTab: false
  },
  {
    duration: 'Yearly',
    price: '1.00',
    features: {
      "10 users included": true,
      "2GB of storage": true,
      "Email support": true,
      "Help center access": true
    },
    link: process.env.NEXT_PUBLIC_UPGRADE_URL,
    newTab: true
  }
];

function Upgrade() {
  return (
    <div className='p-10'>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          {PricingPlan.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12 bg-gray-900">
              <div className="text-center">
                <h2 className="text-lg font-medium text-white">
                  {item.duration}
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-white sm:text-4xl"> ${item.price} </strong>
                  {item.duration !== 'Free' && (
                    <span className="text-sm font-medium text-gray-300">/year</span>
                  )}
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {Object.entries(item.features).map(([feature, available], i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className={`size-5 ${available ? 'text-green-400' : 'text-red-500'}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={available ? "M4.5 12.75l6 6 9-13.5" : "M6 18L18 6M6 6l12 12"} />
                    </svg>
                    <span className={available ? "text-gray-300" : "text-gray-500"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={item.link}
                target={item.newTab ? "_blank" : "_self"}
                rel={item.newTab ? "noopener noreferrer" : ""}
                className={`mt-8 block rounded-full px-12 py-3 text-center text-sm font-medium 
                  ${item.duration === 'Free' ? 'border border-gray-400 text-gray-300 hover:bg-gray-700' : 'border border-indigo-400 bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                {item.duration === 'Free' ? "Get Started" : "Upgrade Now"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
