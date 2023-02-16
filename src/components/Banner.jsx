import React from "react";

export default function Banner() {
    return (
        <section className='h-96 relative'>
            <div className='w-full h-full bg-cover bg-banner bg-center opacity-80'></div>
            <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                <h2 className='text-6xl'>We are most alive</h2>
                <p className='text-2xl'>when we're in love</p>
            </div>
        </section>
    )
}