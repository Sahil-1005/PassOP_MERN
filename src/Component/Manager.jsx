import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// https://www.npmjs.com/package/uuid to generate unique id
import { v4 as uuidv4 } from 'uuid';
// https://ant.design/ and https://lordicon.com/icons for icons
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            try {
                const parsedPasswords = JSON.parse(passwords);
                if (Array.isArray(parsedPasswords)) {
                    setPasswordArray(parsedPasswords);
                } else {
                    console.error("Data retrieved from local storage is not an array.");
                }
            } catch (error) {
                console.error("Error parsing passwords from local storage:", error);
            }
        }
    }, []);

    const copyText = (text) => {
        toast('Copied To Clipboard!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };
    // eye icon setting show and hide with ref
    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("hideIcon.png")) {
            ref.current.src = "showIcon.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "hideIcon.png";
            passwordRef.current.type = "text";
        }
    };
    // saving the password with conditon
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            console.log("Saved passwords:", updatedPasswords);
            setPasswordArray(updatedPasswords);
            toast('Password saved sucessfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Password not saved eneter valid details!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setForm({ site: "", username: "", password: "" })
    };

    const deletePassword = (id) => {
        let check = confirm("Do you really want to delete password??")
        if (check) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast('Password deleted sucessfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }
    // setting the output array when input fields are chnaged
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* for tailwing background visit https://bg.ibelick.com/ */}

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>
            {/* below class is for setting main container height */}

            <div className='md:p-0 p-2 md:mycontainer min-h-[83vh]'>
                <h1 className='text-2xl text font-bold text-center mt-10' >
                    <span className='text-green-500'> &lt; </span>
                    Password
                    <span className='text-green-500'> Manager / &gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager.....</p>
                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input required value={form.site} onChange={handleChange} placeholder="Enter website name or site URL" className="rounded-full border border-green-500 w-full p-4 py-1" type='text' name='site' id=''></input>
                    <div className='flex w-full gap-8'>
                        <input required value={form.username} onChange={handleChange} placeholder="Enter user name" className="rounded-full border border-green-500 w-full p-4 py-1" type='text' name='username' id=''></input>
                        <div className='relative'>
                            <input ref={passwordRef} required value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type='password' name='password' id=''></input>
                            <span className='absolute right-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2' width={35} src="/showIcon.png" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-black flex justify-center items-center bg-green-400 hover:bg-green-300 gap-3 h-10 rounded-full px-6 py-3 w-fit border-green-900 border-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "height": "30px" }}>
                        </lord-icon>Save Password
                    </button>
                </div>
                <div className='passwords'>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className='font-bold text-2xl py-4'> Your Saved Passwords......</h2>
                        </div>

                        {/* for components badge visit https://flowbite.com/docs/components/badge/ */}

                        <div className='flex justify-between py-4'>
                            <div className='flex'>
                                <span className='py-2 px-6 bg-green-100 text-green-100 rounded dark:bg-green-900 dark:text-geen-300'>Edit</span>
                                <span className='cursor-pointer mx-2 py-1'>
                                    <EditOutlined style={{ fontSize: '24px', color: '#0f0f0f', marginRight: '30px', marginTop: '5px' }} />
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='py-2 px-3 bg-red-100 text-red-100 rounded dark:bg-red-900 dark:text-red-300'>Delete</span>
                                <span className='cursor-pointer mx-2'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                        trigger="hover"
                                        style={{ "marginRight": "30px", "height": "28px", "marginTop": "6px" }}>
                                    </lord-icon>
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='py-2 px-4 bg-gray-100 text-gray-100 rounded dark:bg-gray-900 dark:text-gray-300'>Copy</span>
                                <span className='cursor-pointer mx-2 py-1'>
                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px' }} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* https://tailwindcss.com/docs/table-layout for table in tailwind */}

                    {passwordArray.length === 0 && <div>No Password found</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordIconCopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                    {/* <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/sbrtyqxj.json"
                                                        trigger="hover">
                                                    </lord-icon> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='lordIconCopy py-2 border border-white text-center' onClick={() => { copyText(item.username) }}>
                                            <div className='flex justify-center items-center'>
                                                {item.username}
                                                <div className='size-7 cursor-pointer'>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                    {/* <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/sbrtyqxj.json"
                                                        trigger="hover">
                                                    </lord-icon> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>

                                                {/* expression for hide password in saved password table */}
                                                
                                                {item.password.replace(/./g, '*')}
                                                <div className='lordIconCopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                    {/* <DeleteOutlined /> */}
                                                    {/* <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/sbrtyqxj.json"
                                                        trigger="hover">
                                                    </lord-icon> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                    <EditOutlined style={{ fontSize: '24px', color: '#0f0f0f' }} />
                                                    {/* <lord-icon
                                                        src="https://cdn.lordicon.com/dwoxxgps.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon> */}
                                                </span>
                                                <span className='cursor-pointer mx-3' onClick={() => { deletePassword(item.id) }}>
                                                    {/* <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f' }}/> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover"
                                                        style={{ "height": "28px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
