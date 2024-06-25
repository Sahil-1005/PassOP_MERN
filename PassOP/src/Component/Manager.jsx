import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { EditOutlined, CopyOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const passwordRef1=useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPasswordId, setShowPasswordId] = useState(null); // State to manage which row's password should be shown
    const [click, setClick] = useState(false);
    const [click1, setClick1] = useState(false);

    const handleClick1 = () => {
        setClick1(!click1)
        if (!click1) {
            passwordRef1.current.type = "text"
        }
        else {
            passwordRef1.current.type = "password"
            
        }
    }

    const handleClick = (id) => {
        setShowPasswordId(id)
        setClick(!click)
        if (click) {
            passwordRef.current.type = "text"
        }
        else {
            passwordRef.current.type = "password"
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPasswords = passwordArray.filter(item =>
        item.site.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPsswords = async () =>{
        let req=await fetch("http://localhost:3000/")
        let passowords = await req.json()
        console.log(passowords)
        setPasswordArray(passowords)
    }
    useEffect(() => {
        getPsswords()
        // const passwords = localStorage.getItem("passwords");
        // if (passwords) {
        //     try {
        //         const parsedPasswords = JSON.parse(passwords);
        //         if (Array.isArray(parsedPasswords)) {
        //             setPasswordArray(parsedPasswords);
        //         } else {
        //             console.error("Data retrieved from local storage is not an array.");
        //         }
        //     } catch (error) {
        //         console.error("Error parsing passwords from local storage:", error);
        //     }
        // }
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


    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:form.id})})

            const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
            let res= await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form, id: uuidv4()})})
            //localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setPasswordArray(updatedPasswords);
            toast('Password saved successfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('Password not saved, please enter valid details!!', {
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

    const deletePassword = async(id) => {
        let check = window.confirm("Do you really want to delete password??")
        if (check) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            //localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})})
            toast('Password deleted successfully!!', {
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
    };

    const editPassword = (id) => {
        // const passwordToEdit = passwordArray.find(item => item.id === id);
        // if (passwordToEdit) {
        //     setForm(passwordToEdit);
        //     setPasswordArray(passwordArray.filter(item => item.id !== id));
        // }
        setForm({...passwordArray.filter(i=>i.id===id)[0],id:id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
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

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>

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
                            <input ref={passwordRef1} required value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type='password' name='password' id='password'></input>
                            <span className='absolute right-0 cursor-pointer'>
                                {click1 ? <EyeOutlined onClick={() => handleClick1()} style={{ "marginTop": "10px", marginRight: "7px" }} /> : <EyeInvisibleOutlined onClick={() => handleClick1()} style={{ "marginTop": "10px", marginRight: "7px" }} />}
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-black flex justify-center items-center 
                    bg-green-400 hover:bg-green-300 gap-3 h-10 rounded-full px-6 py-3 w-fit border-green-900 border-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "height": "25px" }}>
                        </lord-icon>Save Password
                    </button>
                </div>
                <div className='passwords'>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className='font-bold text-2xl py-4'> Your Saved Passwords......</h2>
                        </div>
                        <div className='flex justify-between items-center gap-3 py-4'>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search by site name"
                                className="rounded-full border border-green-500 w-full p-4 py-1 mb-4 mt-5"
                            />
                            <div className='flex justify-between bg-black-100 text-black-100 
                                border-r-2 border-green-400'>
                                <span className='py-2 px-2 '>Edit</span>
                                <span className='cursor-pointer mx-2 py-1'>
                                    <EditOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '7px' }} />
                                </span>
                            </div>
                            <div className='flex justify-between bg-black-100 text-black-100 
                                border-r-2 border-green-400'>
                                <span className='py-2 px-2 '>Copy</span>
                                <span className='cursor-pointer mx-2 py-1'>
                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '7px' }} />
                                </span>
                            </div>
                            <div className='flex justify-between bg-black-100 text-black-100 
                                border-r-2 border-green-400'>
                                <span className='py-2 px-2 '>Delete</span>
                                <span className='cursor-pointer mx-2 py-1'>
                                    <DeleteOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '7px' }} />
                                </span>
                            </div>
                        </div>
                    </div>
                    {filteredPasswords.length === 0 && <div>No Password found</div>}
                    {filteredPasswords.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 border-r-2 border-black-400'>Site</th>
                                    <th className='py-2 border-r-2 border-black-400'>Username</th>
                                    <th className='py-2 border-r-2 border-black-400'>Password</th>
                                    <th className='py-2 border-r-2 border-black-400'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {filteredPasswords.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordIconCopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='lordIconCopy py-2 border border-white text-center' onClick={() => { copyText(item.username) }}>
                                            <div className='flex justify-center items-center'>
                                                {item.username}
                                                <div className='size-7 cursor-pointer'>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                {showPasswordId === item.id && click ? item.password : item.password.replace(/./g, '*')}
                                                <div className='lordIconCopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <CopyOutlined style={{ fontSize: '20px', color: '#0f0f0f', marginTop: '5px', marginLeft: '5px' }} />
                                                </div>
                                                {showPasswordId === item.id && click ? <EyeOutlined onClick={() => handleClick(item.id)} /> : <EyeInvisibleOutlined onClick={() => handleClick(item.id)} />}
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                    <EditOutlined style={{ fontSize: '24px', color: '#0f0f0f' }} />
                                                </span>
                                                <span className='cursor-pointer mx-3' onClick={() => { deletePassword(item.id) }}>
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
