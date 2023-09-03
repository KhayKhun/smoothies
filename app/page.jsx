'use client'

import Link from 'next/link'
import supabase from '../config/supabaseClient.js'
import { useEffect, useState } from 'react'
import SmoothieCard from '../components/SmoothieCard.jsx'
export default function Home() {
  // console.log(supabase.authUrl)
  const [data,setData] = useState();
  console.log(data)
  useEffect(()=>{
    async function fetchSmoothies(){
      const {data,error} = await supabase
      .from('smoothies')
      .select()

      if(error){
        console.log(error);
        setData(null)
        return;
      }
      setData(data);
    }

    fetchSmoothies();
  },[])
  return (
    <main>
      <div className="smoothies-list">
      <Link href='/create' className='flex justify-center items-center border-2 min-h-[200px] w-full rounded-lg border-dashed border-teal-300 bg-transparent'>Create new smoothie</Link>
        {
          data ? data.map((smoothie)=> <SmoothieCard key={smoothie.id} smoothie={smoothie}/>)
          :
          null
        }

      </div>

    </main>
  )
}
