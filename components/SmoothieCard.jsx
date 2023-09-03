'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import supabase from '../config/supabaseClient'

const SmoothieCard = ({smoothie}) => {

    const [deleted,setDeleted] = useState(false)

    const deleteSmoothie = async () => {
        const {error} = await supabase
        .from('smoothies')
        .delete()
        .eq('id', smoothie.id)

        if(error) {
            console.log(error)
            return
        }
        alert('Deleted '+ smoothie.title)
        setDeleted(true)
    }

  return (
    <div className={`bg-gray-100 p-3 shadow-md rounded-lg flex flex-col justify-between gap-5 h-full ${deleted ? 'hidden' : ''}`}>
        <div className='flex flex-col gap-5'>
            <h1 className='font-bold text-2xl'>{smoothie.title}</h1>
            <p>{smoothie.method}</p>
            <p>{smoothie.rating} Stars</p>
        </div>

        <div className='w-full grid grid-cols-2 gap-3'>
            <Link href={`/update/${smoothie.id}`} className='btn'>
                Edit
            </Link>
            <button className='btn bg-red-400' onClick={deleteSmoothie}>
                Delete
            </button>
        </div>
    </div>
  )
}

export default SmoothieCard