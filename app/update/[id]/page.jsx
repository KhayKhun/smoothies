'use client'

import { useEffect, useState } from "react"
import supabase from "../../../config/supabaseClient"
import {useRouter} from 'next/navigation'

export default function Page({params}) {
  const router = useRouter();
  const [smoothie,setSmoothie] = useState({
    title : '',
    method : '',
    rating : ''
  });
  const [error,setError] = useState('');

  const empty = {...smoothie}

  const handleInputChange = (e,field) => {
      setSmoothie ((prev) => ({
        ...prev,
        [field] : e.target.value
      }))
  }

  const updateSmoothie =async () => {

    if(smoothie['title'] === '' || smoothie['method'] === '' || smoothie['rating'] === '' || smoothie['rating'] < 0 || smoothie['rating'] > 5){
      setError('Make sure to fill all the blanks and rating must be between 1.0 and 5.0')
      return;
    }
    setError('')

    const {data,error} = await supabase  
      .from('smoothies')
      .update(smoothie)
      .eq('id', params.id)

    if(error) {
      console.log(error);
      return;
    }
    
    alert('Updated');
    setSmoothie(empty);
    router.push('/')
  }

  useEffect(()=>{
    const fetchSingleSmoothie = async () => {

    const {data , error} = await supabase
      .from('smoothies')
      .select()
      .eq('id', params.id)
      .single()

    if(error){
      console.log(error);
      return;
    }
    console.log(data);
    setSmoothie(data);
    }
    fetchSingleSmoothie()
  },[])

  return <>
    {
      smoothie.title !== '' ? 
      <div className="input-cnt">
        <h1>Update {smoothie.title}</h1>

          <input value={smoothie['title']} type="text" placeholder='Title' onChange={(e)=> {handleInputChange(e,"title")}}/>
          <input value={smoothie['method']} type="text" placeholder='Method' onChange={(e)=> {handleInputChange(e,"method")}}/>
          <input value={smoothie['rating']} type="number" placeholder='Rating' onChange={(e)=> {handleInputChange(e,"rating")}}/>
          
          {error && <p className='text-red-600'>{error}</p>}

        <button onClick={updateSmoothie} className="btn">Update</button>
      </div> 
      : 
      <p className="fixed top-1/2 left-1/4">loading...</p>
    }
  </>
}