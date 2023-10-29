"use client"
import { METHODS } from "http";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const App = () => {
  const [customerName, setCustomerName] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [distance, setDistance] = useState('');
  const [carType, setCarType] = useState('micro');
  const [acOption, setACOption] = useState('ac');
  const [tripType, setTripType] = useState('local');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the backend for processing
  };


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-1/2 mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Taxi Bill Generation Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Travel:</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Distance Traveled (in km):</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-row gap-x-4">
          <label className="text-sm font-medium text-gray-700">Car Type:</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="micro"
                checked={carType === 'micro'}
                onChange={() => setCarType('micro')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Micro</span>
            </label>
            {/* Add similar radio button labels for other car types */}
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="mini"
                checked={carType === 'mini'}
                onChange={() => setCarType('mini')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Mini</span>
            </label>
            {/* Add similar radio button labels for other car types */}
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="sedan"
                checked={carType === 'sedan'}
                onChange={() => setCarType('sedan')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Sedan</span>
            </label>
            {/* Add similar radio button labels for other car types */}
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="xuv"
                checked={carType === 'xuv'}
                onChange={() => setCarType('xuv')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">XUV</span>
            </label>
            {/* Add similar radio button labels for other car types */}
          </div>
        </div>

        <div className="mb-4 flex flex-row gap-x-4">

          <label className="text-sm font-medium text-gray-700">AC/Non-AC:</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="ac"
                checked={acOption === 'ac'}
                onChange={() => setACOption('ac')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">AC</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="non-ac"
                checked={acOption === 'non-ac'}
                onChange={() => setACOption('non-ac')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Non-AC</span>
            </label>
          </div>
        </div>        

        <div className="mb-4 flex flex-row gap-x-2">
          <label className="text-sm font-medium text-gray-700">Trip Type:</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="local"
                checked={tripType === 'local'}
                onChange={() => setTripType('local')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Local</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="outstation"
                checked={tripType === 'outstation'}
                onChange={() => setTripType('outstation')}
                className="form-radio text-indigo-600"
                disabled={carType==='sedan' || carType ==='xuv' ? false : true}
              />
              <span className="ml-2">Outstation</span>
            </label>
          </div>
        </div>
        <Link href={{pathname: '/invoice', query:{
          to: customerName,
          car: carType,
          ac: acOption,
          distance: distance,
          outstation: tripType,
          date: travelDate.toString()
        }}}>
          <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >Generate Bill</button>
        </Link>
      </form>
    </div>
    </div>
  );
};

export default App