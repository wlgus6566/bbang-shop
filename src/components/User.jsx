import React from 'react';

export default function User({user: {photoURL, displayName}}) {
    return (
        <div className='flex items-center profile'>
            <img className='w-10 h-10 rounded-full mr-2 text-sm' src={photoURL} alt={displayName}/>
            <span className='text-sm hidden md:block'>{displayName}</span>
        </div>
    )
}
