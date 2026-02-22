import React from 'react'

const UserNotSelected = () => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <img src="./message.png" alt="" className="w-72 animate-pulse duration-1000" />
      <h2 className="mt-5 mb-2 text-4xl font-bold w-fit bg-linear-to-r from-blue-500 via-teal-600 to-teal-400 bg-clip-text text-transparent">
        Chat Window
      </h2>
      <p className='max-w-130 text-center text-lg text-zinc-400'>
        You're now chatting with your selected contact. Send messages instantly
        and keep the conversation flowing.
      </p>
    </div>
  );
}

export default UserNotSelected
