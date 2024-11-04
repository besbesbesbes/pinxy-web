//rafce

import React from 'react'
import { ShieldX } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

const UserList = () => {
    return (
        <div>
            <div>

                <div className='border rounded-md shadow-md p-2'>


                    <div className='flex justify-between '>
                        <div className='bg-gray-200 rounded-full items-center justify-center'>
                            No <br /> Image
                        </div>

                        <div className='px-2'>
                            <h1> Display Name </h1>
                            <br />
                            <h1 className='text-sm'> username..</h1>
                        </div>


                        <div className='py-2 flex gap-2'>
                            <button className='flex bg-red-600 rounded-md text-white p-2'><ShieldX /><h1>BAN</h1></button>
                            <button className='flex bg-blue-700 rounded-md text-white p-2'><ShieldCheck /><h1>UNBAN</h1></button>
                        </div>





                    </div>

                </div>
            </div>


            <div className='py-6'>

                <div className='border rounded-md shadow-md p-2'>


                    <div className='flex justify-between '>
                        <div className='bg-gray-200 rounded-full items-center justify-center'>
                            No <br /> Image
                        </div>

                        <div className='px-2'>
                            <h1> Display Name </h1>
                            <br />
                            <h1 className='text-sm'> username..</h1>
                        </div>


                        <div className='py-2 flex gap-2'>
                            <button className='flex bg-red-600 rounded-md text-white p-2'><ShieldX /><h1>BAN</h1></button>
                            <button className='flex bg-blue-700 rounded-md text-white p-2'><ShieldCheck /><h1>UNBAN</h1></button>
                        </div>





                    </div>

                </div>
            </div>
        </div>



    )
}

export default UserList