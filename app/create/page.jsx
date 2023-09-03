'use client'
import React, { useState } from 'react'
import supabase from '../../config/supabaseClient.js'
import { useRouter } from 'next/navigation'

const create = () => {
  const router = useRouter()

  const [newSmoothie,setNewSmoothie] = useState({
    title : '',
    method : '',
    rating : ''
  })
  const [error,setError] = useState('');
  const empty = {...newSmoothie}

  const handleInputChange = (e,field) => {
      setNewSmoothie ((prev) => ({
        ...prev,
        [field] : e.target.value
      }))
  }

  const AddSmoothie =async () => {

    if(newSmoothie['title'] === '' || newSmoothie['method'] === '' || newSmoothie['rating'] === '' || newSmoothie['rating'] < 0 || newSmoothie['rating'] > 5){
      setError('Make sure to fill all the blanks and rating must be between 1.0 and 5.0')
      return;
    }
    setError('')
    const {data,error} = await supabase
    .from('smoothies')
    .insert(newSmoothie)

    if(error) {
      console.log(error);
      return;
    }

    alert('Added')
    setNewSmoothie(empty)
    router.push('/')
  }

  return (
    <div className='input-cnt'>
      <h1>Create smoothie</h1>

      <input value={newSmoothie['title']} type="text" placeholder='Title' onChange={(e)=> {handleInputChange(e,"title")}}/>
      <input value={newSmoothie['method']} type="text" placeholder='Method' onChange={(e)=> {handleInputChange(e,"method")}}/>
      <input value={newSmoothie['rating']} type="number" placeholder='Rating' onChange={(e)=> {handleInputChange(e,"rating")}}/>
      {error && <p className='text-red-600'>{error}</p>}
      <button onClick={AddSmoothie} className='btn'>Create</button>
    </div>
  )
}

export default create