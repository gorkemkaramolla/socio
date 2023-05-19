'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import HelloText from "@/components/HelloText";

export default function Home() {
  return (
    <div className='container grid grid-cols-12 min-w-full w-screen h-screen bg-white'>
        <div className={'col-span-1 z-40'}>
            <Navbar/>
        </div>
        <div className={'col-span-10 m-auto'}>
           <HelloText/>
        </div>
        <div className={'col-span-1'}>
       fgfdg
        </div>

    </div>
  );
}
