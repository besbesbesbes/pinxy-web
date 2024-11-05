// rafce

import React from 'react'
import FilterUser from '../../components/card/FilterUser'
import UserList from '../../components/card/UserList'
import { UserRoundSearch } from 'lucide-react';
import { UsersRound } from 'lucide-react';

const UserManage = () => {
  return (

    <div className='flex'>

      

        <div className='w-1/2 p-4 bg-blue-300 h-screen'>
          <h1 className='font-bold text-2xl flex gap-2'><UserRoundSearch />Filter Users</h1>
          <FilterUser />
        </div>

      


      <div className='min-w-[33%] p-4 bg-white h-screen overflow-y-auto'>
        <h1 className=' font-bold text-2xl flex gap-2'><UsersRound />User Lists</h1>
        <UserList />

      </div>

    </div>
  )
}

export default UserManage