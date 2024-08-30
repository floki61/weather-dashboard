'use client'
import React, { useState } from 'react';
import Header from '@/components/Header';


export default function WeatherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='bg-background flex flex-col min-h-screen w-screen'>
      <div className=''>
        <Header setSidebarOpen={setSidebarOpen} />
      </div>
      <div className='flex lg:flex-row flex-col h-full w-full mx-auto px-4 sm:px-6 lg:px-12 py-8  gap-4'>
        <div className='h-full lg:w-2/3 w-full grid grid-rows-2'>
          <div className='h-full  rounded-xl border bg-blue-200'>

          </div>
          <div className='h-full grid sm:grid-cols-2 gap-4 pt-4'>
            <div className='h-full  rounded-xl border'></div>
            <div className='h-full  rounded-xl border'></div>
            <div className='h-full  rounded-xl border'></div>
            <div className='h-full  rounded-xl border'></div>
          </div>
        </div>
        <div className='h-full lg:w-1/3 w-full border rounded-xl'>
        </div>
      </div>
    </div >
  );
};
