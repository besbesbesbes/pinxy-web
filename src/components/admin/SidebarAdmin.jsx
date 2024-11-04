//rafce
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserRoundPen } from 'lucide-react';
import { FolderCog } from 'lucide-react';
import { Power } from 'lucide-react';

const SidebarAdmin = () => {
  return (
    <div className='bg-blue-100 w-64 text-gray-500 flex flex-col h-screen'>

      <div className=' h-24 bg-blue-500 flex items-center text-white text-2xl font-bold justify-center'>
        LOGO
      </div> 

      <nav className='flex-1 px-2 py-4 space-y-2'>
        <NavLink
        to = {'/admin/usermanage'}
        end
        className={({isActive})=>
        isActive
        ? ' text-gray-600 font-bold rounded-md  flex px-4 py-2 items-center'
        : 'text-gray-600 font-bold px-4 py-2 flex rounded items-center'
        }
        >
        <UserRoundPen className='mr-2' />
          User Management
        </NavLink>


        <NavLink
        to = {'/admin'}
        className={({isActive})=>
        isActive
        ? ' text-gray-600 font-bold rounded-md flex px-4 py-2 items-center'
        : 'text-gray-600 font-bold px-4 py-2 flex rounded items-center'
        }
        >
        <FolderCog className='mr-2' />
          Post Management
        </NavLink>
      </nav>

 
       <div>
        <NavLink
        to = {'/'}
        className={({isActive})=>
          isActive
         ? ' text-gray-600 font-bold rounded-md flex px-4 py-2 items-center'
        : 'text-gray-600 font-bold px-4 py-2 flex rounded items-center'

        }
        >
          <Power className='mr-2' />
           Logout
        </NavLink>
       
       </div>

    </div>
  )
}

export default SidebarAdmin