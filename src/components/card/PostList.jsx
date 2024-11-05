//rafce 

import React from 'react'
import { ShieldX } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

const PostList = () => {
    return (
        <div>

            <div>

                <div className='border rounded-md shadow-md p-2'>


                    <div className=' flex'>
                        <div className='bg-gray-200 rounded-full items-center justify-center'>
                            NO <br />Image
                        </div>

                        <div className='px-2'>
                            Display name
                        </div>

                    </div>

                    <div className='py-2'>
                        Text or Caption
                    </div>



                    <div className='py-2'>
                        <div className='w-full h-24 bg-gray-200 rounded-md text-center items-center flex justify-center shadow-md'>
                            NO image
                        </div>

                    </div>




                    <div className='py-2 flex gap-2'>
                        <button className='flex bg-red-600 rounded-md text-white p-2'> <ShieldX /> <h1>BAN</h1> </button>
                        <button className='flex bg-blue-700 rounded-md text-white p-2'><ShieldCheck /><h1>UNBAN</h1></button>


                    </div>



                </div>

            </div>

            <div className='py-6'>

                <div className='border rounded-md shadow-md p-2'>


                    <div className=' flex'>
                        <div className='bg-gray-200 rounded-full items-center justify-center'>
                            NO <br />Image
                        </div>

                        <div className='px-2'>
                            Display name
                        </div>

                    </div>

                    <div className='py-2'>
                        Text or Caption
                    </div>



                    <div className='py-2'>
                        <div className='w-full h-24 bg-gray-200 rounded-md text-center items-center flex justify-center shadow-md'>
                            NO image
                        </div>

                    </div>




                    <div className='py-2 flex gap-2'>
                        <button className='flex bg-red-600 rounded-md text-white p-2'> <ShieldX /> <h1>REJECT</h1> </button>
                        <button className='flex bg-blue-700 rounded-md text-white p-2'><ShieldCheck /><h1>APPROVE</h1></button>


                    </div>



                </div>

            </div>

        </div>



    )
}

export default PostList