import React from 'react';

const PostForm = ({ handleSubmit, content, setContent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;