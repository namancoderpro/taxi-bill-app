"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Invoice = (searchParams:any) => {
    const search = useSearchParams()
    const distance = Number(search.get('distance'))
    const outstation = search.get('outstation')
    const car = search.get('car')
    const ac = search.get('ac')
    const customer = search.get('to')
    const date = search.get('date')

    let prices = {
    "micro": {
      "ac": 50,
      "non-ac": 30,
      "10": 6,
      "30": 5,
      "40": 4,
      "local": 0,
      "outstation": 0,
    },
    "mini": {
      "ac": 80,
      "non-ac": 60,
      "10": 7,
      "30": 6,
      "40": 5,
      "local": 0,
      "outstation": 0,
    },
    "sedan": {
      "ac": 150,
      "non-ac": 100,
      "10": 8.5,
      "30": 7,
      "40": 6,
      "local": 0,
      "outstation": 80,
    },
    "xuv": {
      "ac": 250,
      "non-ac": 150,
      "10": 10,
      "30": 8,
      "40": 7,
      "local": 0,
      "outstation": 100,
    },

  }

    let distupto10, distupto30, distover30 = 0
    let totalprice = 0
    let base = 0
    let outstationCost = 0
    if (distance > 10) {
      distupto10 = 10
      if (distance <= 30){
        distupto30 = distance - 10
        distover30 = 0
      }
      if (distance > 30) {
        distupto30 = 20
        distover30 = distance - 30
      }
    } else {
      distupto10 = distance
    }

    if (outstation == "outstation") {
      outstationCost = prices[car as keyof typeof prices]["outstation"]
      totalprice += prices[car as keyof typeof prices]["outstation"]
    } else {
      outstationCost = prices[car as keyof typeof prices]["local"]
      totalprice += prices[car as keyof typeof prices]["local"]
    }

    if (ac == "ac") {
      base = prices[car as keyof typeof prices]["ac"]
      totalprice += prices[car as keyof typeof prices]["ac"]
    } else {
      base = prices[car as keyof typeof prices]["non-ac"]
      totalprice += prices[car as keyof typeof prices]["non-ac"]
    }

    totalprice += distupto10 * prices[car as keyof typeof prices]["10"] + distupto30! * prices[car as keyof typeof prices]["30"] + distover30! * prices[car as keyof typeof prices]["40"]


    let invoice = {
      from: "Sterling Cab, Inc",
      to: "My Org, Inc",
      date: "23rd June, 2023",
      items: [{
        "name": `${car?.toUpperCase()} Base Fare (${ac?.toUpperCase()})`,
        "quantity": 1,
        "unit_cost": base,
        "description": "Your car's base fare"
      },{
        "name": `${car?.toUpperCase()} Car Fare Upto 10kms`,
        "quantity": distupto10,
        "unit_cost": prices[car as keyof typeof prices]["10"],
        "description": "Fare upto 10kms for your car"
      },
      {
        "name": `${car?.toUpperCase()} Car Fare Next 20kms`,
        "quantity": distupto30,
        "unit_cost": prices[car as keyof typeof prices]["30"],
        "description": "Fare upto 10kms for your car"
      },
      {
        "name": `${car?.toUpperCase()} Car Over 30kms`,
        "quantity": distover30,
        "unit_cost": prices[car as keyof typeof prices]["40"],
        "description": "Fare over 30kms for your car"
      },
      {
        "name": "Outstation Fare",
        "quantity": (outstation === "outstation") ? 1 : 0,
        "unit_cost": outstationCost,
        "description": "Outstation travel fee (if applicable)",
      }
    ],
    total: totalprice
    }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-2/3 mx-auto shadow-lg rounded-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-center mb-2">Invoice</h1>
          <div className="flex justify-between mt-4">
            <div>
              <div className="text-gray-600">Date:</div>
              <div className="font-semibold">{date}</div>
            </div>
          </div>
        </div>

        <div className='flex justify-between mt-4'>
             <div>
            <div className="text-gray-600">Invoice From:</div>
            <div className="font-semibold">Sterling Cab, Inc.</div>
            <div>123 Business St, City, State, ZIP</div>
            <div>Email: contact@sterlingcab.com</div>
        </div>

        <div className="mb-6">
          <div className="text-gray-600 mb-2">Bill To:</div>
          <div className="font-semibold">{customer}</div>
          <div>123 Main St, City, State, ZIP</div>
          <div>Email: john.doe@example.com</div>
        </div>
        </div>


        <table className="w-full border-collapse border border-gray-300 mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">Item</th>
              <th className="text-left py-2 px-4">Quantity</th>
              <th className="text-left py-2 px-4">Unit Price</th>
              <th className="text-left py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody className=''>
            {
                invoice.items?.map((item, i) => {
                    return (
                        <tr>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.quantity}</td>
                            <td className="py-2 px-4">{item.unit_cost}</td>
                            <td className="py-2 px-4">{item.quantity! * item.unit_cost}</td>
                        </tr> 
                    )
                })
            }
          </tbody>
        </table>

        <div className="mt-8">
          <p className="text-right font-semibold text-xl mt-2">Total: Rs. {String(totalprice)}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;