import React from 'react'
import { useRef } from 'react';
const Navbar = () => {
    const ref = useRef();
    return (
        // Navigationbar for app
        <nav className='bg-slate-800 text-white'>
            <div className='mycontainer flex justify-between items-center px-4 py-5 h-16'>
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt; </span>
                    Password
                    <span className='text-green-500'> Manger / &gt;</span>

                </div>
                {/* Menubar items */}
                {/* <ul>
                    
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='#'>About</a>
                        <a className='hover:font-bold' href='#'>Contact</a>
                        <a className='hover:font-bold' href='#'>LogOut</a>
                    </li>
                </ul> */}
                <div>
                    <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
                        <img className='invert w-10 py-1 px-2' ref={ref} src="/github_icon.png" alt="show" />
                        <span className='font-bold px-4'>GitHub</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
