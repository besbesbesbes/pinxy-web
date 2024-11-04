//rafce

import React from 'react'

const FilterUser = () => {



  return (

    //search by text 

    <div>
        <div className='py-3'>
          <input
          onChange={()=> setText()} 
          placeholder='Search Users....'
          className='border rounded-md w-full mb-4 px-2'
           />
        </div>

        <hr />

        <div>

          <div className='py-2'>
            <input type='checkbox' />
            <label className='font-bold'>Reported</label>
          </div>

          <div className='py-2'>
            <input type='checkbox' />
            <label className='font-bold'>Banned</label>
          </div>

        </div>



    </div>
  )
}

export default FilterUser