//rafce 

import React from 'react'
import PostList from '../../components/card/PostList'
import FilterPosts from '../../components/card/FilterPosts'
import { FolderSearch } from 'lucide-react';
import { ScrollText } from 'lucide-react';

const PostManage = () => {
  return (

<div className='flex'>


    <div className='w-1/2 p-4 bg-blue-300 h-screen'>
    <h1 className='font-bold text-2xl flex gap-2'><FolderSearch />Filter Posts</h1>
      <FilterPosts />
      </div>

     

      <div className='min-w-[33%] p-4 bg-white h-screen overflow-y-auto'>
         <h1 className=' font-bold text-2xl flex gap-2'><ScrollText />Post Lists</h1>
        <PostList />
      </div>












</div>

    
  )
}

export default PostManage