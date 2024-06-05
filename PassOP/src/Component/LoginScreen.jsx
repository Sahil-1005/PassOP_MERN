// LoginPage.js
import React, { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginScreen = () => {
    const userName = "Sahil";
    const passWord = "Sahil@123";
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>

            <div className='md:p-0 p-2 md:mycontainer min-h-[80vh]'>
                <h1 className='text-2xl font-bold text-center mt-10'>
                    <span className='text-green-500'>&lt;</span>
                    Password
                    <span className='text-green-500'>&gt; Manager</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager.....</p>
                <p className='text-green-900 text-lg text-center mt-2'>Login to Continue.....</p>
                
                <div className='flex flex-col justify-center items-center bg-gray-800 p-5 sm:p-10 rounded-lg max-w-sm w-full mx-auto mt-10 mb-10'>
                    <div className='flex flex-col mb-2 sm:mb-4 mt-2'>
                        <p className='text-white mb-1'>Enter Username</p>
                        <input onChange={handleChange} className='rounded p-2' type='text' placeholder='Enter Username' name="username" />
                    </div>
                    <div className='flex flex-col mb-2 sm:mb-4'>
                        <p className='text-white mb-1'>Enter Password</p>
                        <input onChange={handleChange} className='rounded p-2' type='password' placeholder='Enter Password' name="password" />
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                        <LoginOutlined  style={{ fontSize: '30px', color: '#ffff', marginTop: '10px' }} />
                        <p className='text-white mt-2 mb-1'>Login</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginScreen;
