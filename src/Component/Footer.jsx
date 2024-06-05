import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
            <div className="logo font-bold text-white text-xl">
                <span className='text-green-500'> &lt; </span>
                Password
                <span className='text-green-500'> Manger / &gt;</span>

            </div>
            <div className='flex justify-center items-center'>
                Created By<img className='w-6' src='/heart.png' alt='heart_image'></img>Sahil Belim.....
            </div>
        </div>
    )
}

export default Footer
