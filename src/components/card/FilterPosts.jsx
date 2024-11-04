//rafce

import React, { useEffect, useState } from 'react'

const FilterPosts = () => {

    // const getPost =


    return (
        //Search by text
        <div>
            <div className='py-3'>
                {/* <h1 className='text-sm mb-4'>Search Post</h1> */}

                <input
                    onChange={() => setText()}
                    placeholder='Search Post....'
                    className='border rounded-md w-full mb-4 px-2'
                />
            </div>

            {/* Search by category */}

            <hr />



            <div>

                <div>

                    <div className='py-2'>
                        <input type="checkbox" />
                        <label className='font-bold'>Reported</label>
                    </div>

                    <div className='py-2'>
                        <input type="checkbox" />
                        <label className='font-bold'>Banned</label>
                    </div>

                    <div className='py-2'>
                        <input type="checkbox" />
                        <label className='font-bold'>Waiting for approval</label>
                    </div>

                    <div className='py-2'>
                        <input type="checkbox" />
                        <label className='font-bold'>Rejected</label>
                    </div>

                </div>



            </div>



        </div>
    )
}

export default FilterPosts