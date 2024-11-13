// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { userRegister } from '../api/auth'
// import PrivacyPolicy from './PrivacyPolicy'
// import TermAndCond from './TermAndCond'

// const INITIAL_ERROR_INPUT = {
//     name: "Please fill USERNAME.",
//     email: "Please fill EMAIL.",
//     password: "Please fill PASSWORD.",
//     confirmPassword: "Please fill CONFIRM PASSWORD."
// }

// function Register() {

//     const navigate = useNavigate()
//     const [registerData, setRegisterData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     })
//     const [error, setError] = useState({})
//     //CHECK CHECKBOX
//     const [isCheck, setIsCheck] = useState(false)
//     //CHECK ERROR
//     const [isError, setIsError] = useState(null)

//     console.log("l", registerData)

//     const hdlOnChange = (e) => {
//         setRegisterData({
//             ...registerData,
//             [e.target.name]: e.target.value
//         })

//         validate(e.target.name, e.target.value)
//     }

//     console.log("registerData", registerData)
//     const hdlIsCheck = (e) => {
//         setIsCheck(!isCheck)
//     }

//     const validate = (name, value) => {
//         let alertError = {};
//         console.log(alertError)
//         if (Object.keys(error).length === 0) {
//             alertError = { ...INITIAL_ERROR_INPUT }
//         } else {
//             alertError = { ...error }
//         }
//         // CHECK USERNAME
//         if (name === 'name') {
//             if (!value.trim()) {
//                 alertError.name = "Please fill USERNAME."
//             } else {
//                 alertError.name = ""
//             }
//         }
//         // CHECK EMAIL
//         else if (name === "email") {
//             if (!value.trim()) {
//                 alertError.email = "Please fill EMAIL."
//             } else if (!registerData.email.includes("@") || !registerData.email.includes(".")) {
//                 alertError.email = "EMAIL must have @ and ."
//             } else {
//                 alertError.email = ""
//             }
//         }
//         // CHECK PASSWORD AND CONFIRM PASSWORD
//         else if (name === "password") {
//             if (!value.trim()) {
//                 alertError.password = "Please fill PASSWORD."
//             } else if (value.length <= 8) {
//                 alertError.password = "PASSWORD must have more than eight characters."
//             } else {
//                 alertError.password = ""
//             }
//             if (value !== registerData.confirmPassword) {
//                 alertError.confirmPassword = "PASSWORD do not match."
//             } else {
//                 alertError.confirmPassword = ""
//             }
//         } else if (name === "confirmPassword") {
//             if (!value.trim()) {
//                 alertError.confirmPassword = "Please fill CONFIRM PASSWORD."
//             } else if (value !== registerData.password) {
//                 alertError.confirmPassword = "PASSWORD do not match."
//             } else {
//                 alertError.confirmPassword = ""
//             }
//         }
//         setError(alertError)
//         return setIsError(!!(alertError.confirmPassword || alertError.password || alertError.email || alertError.name))
//     }


//     const hdlSubmit = async (e) => {
//         e.preventDefault()
//         try {

//             if (registerData.name === "" && registerData.email === "" && registerData.password === "" && registerData.confirmPassword === "") {
//                 alert("please fill all the data")
//             } else if (!isError && isCheck) {
//                 alert("register pass");
//                 userRegister(registerData)
//             } else if (isError) {
//                 alert("please fill all the data");
//             } else if (!isCheck) {
//                 alert("Please agree to the Privacy Policy and Terms and Conditions.");
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }



//     const hdlOnLink = (e) => {
//         e.preventDefault()
//         navigate("/")
//     }

//     return (
//         <div className='flex flex-row h-screen bg-green-100 text-slate-700'>
//             {/* LEFT */}
//             <div className='w-1/2 bg-pink-100'>
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//                 <div>
//                     <h1>Discover What's Happening near You.</h1>
//                 </div>
//             </div>
//             {/* RIGHT */}
//             <div className='w-1/2 flex flex-col items-center justify-center'>
//                 <div className="flex flex-col w-2/3 h-4/5 bg-my-bg-main bg-opacity-60 shadow-lg p-10 justify-evenly rounded-3xl" >
//                     {/* CONTENT */}
//                     <div className='text-center text-4xl font-bold'>REGISTER</div>
//                     {/* INPUT */}
//                     <div className='flex flex-col text-lg'>
//                         <label className='flex flex-row justify-between font-medium'>USERNAME <span className="text-red-500 text-sm">{error.name}</span></label>
//                         <input name='name' value={registerData.name} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                         <label className='flex flex-row justify-between font-medium'>EMAIL <span className="text-red-500 text-sm" >{error.email}</span></label>
//                         <input name='email' value={registerData.email} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                         <label className='flex flex-row justify-between font-medium'>PASSWORD <span className="text-red-500 text-sm" >{error.password}</span></label>
//                         <input name='password' value={registerData.password} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                         <label className='flex flex-row justify-between font-medium'>CONFIRM PASSWORD <span className="text-red-500 text-sm" >{error.confirmPassword}</span></label>
//                         <input name='confirmPassword' value={registerData.confirmPassword} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                     </div>
//                     {/* PRIVACY AND BUTTON */}
//                     <div className='flex flex-col gap-10 items-center'>
//                         <div className='flex flex-row gap-3'>
//                             <input type="checkbox" checked={isCheck} onChange={hdlIsCheck} className="scale-150" />
//                             <p className="text-lg">I agree to the <button className="underline hover:text-my-prim font-bold" onClick={() => document.getElementById('privacy').showModal()}>Privacy Policy</button> and the <button className="underline hover:text-my-prim font-bold" onClick={() => document.getElementById('terms').showModal()}>Terms and Conditions</button></p>
//                             {/* PRIVACY POLICY */}
//                             <dialog id="privacy" className="modal">
//                                 <div className="modal-box bg-blue-100">
//                                     <form method="dialog">
//                                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                                     </form>
//                                     <PrivacyPolicy />
//                                 </div>
//                             </dialog>
//                             {/* TERMS AND CONDITIONS */}
//                             <dialog id="terms" className="modal">
//                                 <div className="modal-box bg-blue-100">
//                                     <form method="dialog">
//                                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                                     </form>
//                                     <TermAndCond />
//                                 </div>
//                             </dialog>
//                         </div>

//                         <div className='flex flex-col items-center gap-1'>
//                             <button className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-xl font-semibold' onClick={hdlSubmit}>CREATE ACCOUNT</button>
//                             <div className="text-base">Already have an account? <button onClick={hdlOnLink} className="underline hover:text-my-prim font-bold">Log in</button></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Register


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '../api/auth'
import PrivacyPolicy from './PrivacyPolicy'
import TermAndCond from './TermAndCond'
import { toast } from 'sonner';

const INITIAL_ERROR_INPUT = {
    name: "Please fill USERNAME.",
    email: "Please fill EMAIL.",
    password: "Please fill PASSWORD.",
    confirmPassword: "Please fill CONFIRM PASSWORD."
}

function Register() {

    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState({})
    //CHECK CHECKBOX
    const [isCheck, setIsCheck] = useState(false)
    //CHECK ERROR
    const [isError, setIsError] = useState(null)



    const hdlOnChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })

        validate(e.target.name, e.target.value)
    }

    // console.log("registerData", registerData)
    const hdlIsCheck = (e) => {
        setIsCheck(!isCheck)
    }

    const validate = (name, value) => {
        let alertError = {};
        console.log(alertError)
        if (Object.keys(error).length === 0) {
            alertError = { ...INITIAL_ERROR_INPUT }
        } else {
            alertError = { ...error }
        }
        // CHECK USERNAME
        if (name === 'name') {
            if (!value.trim()) {
                alertError.name = "Please fill USERNAME."
            } else {
                alertError.name = ""
            }
        }
        // CHECK EMAIL
        else if (name === "email") {
            if (!value.trim()) {
                alertError.email = "Please fill EMAIL."
            } else if (!registerData.email.includes("@") || !registerData.email.includes(".")) {
                alertError.email = "EMAIL must have @ and ."
            } else {
                alertError.email = ""
            }
        }
        // CHECK PASSWORD AND CONFIRM PASSWORD
        else if (name === "password") {
            if (!value.trim()) {
                alertError.password = "Please fill PASSWORD."
            } else if (value.length <= 8) {
                alertError.password = "PASSWORD must have more than eight characters."
            } else {
                alertError.password = ""
            }
            if (value !== registerData.confirmPassword) {
                alertError.confirmPassword = "PASSWORD do not match."
            } else {
                alertError.confirmPassword = ""
            }
        } else if (name === "confirmPassword") {
            if (!value.trim()) {
                alertError.confirmPassword = "Please fill CONFIRM PASSWORD."
            } else if (value !== registerData.password) {
                alertError.confirmPassword = "PASSWORD do not match."
            } else {
                alertError.confirmPassword = ""
            }
        }
        setError(alertError)
        return setIsError(!!(alertError.confirmPassword || alertError.password || alertError.email || alertError.name))
    }


    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {

            if (registerData.name === "" && registerData.email === "" && registerData.password === "" && registerData.confirmPassword === "") {
                toast.error("Please complete the required fields.");
            } else if (!isError && isCheck) {
                const res = await userRegister(registerData)
                navigate(0)
                console.log("res from register", res)
            } else if (isError) {
                toast.error("Please complete the required fields.");
            } else if (!isCheck) {
                toast.error("Please agree to the Privacy Policy and Terms and Conditions.");
            }

        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnEnter = async (e) => {
        try {

            if (e.key === "Enter" && registerData.name === "" && registerData.email === "" && registerData.password === "" && registerData.confirmPassword === "") {
                toast.error("Please complete the required fields.");
            } else if (e.key === "Enter" && !isError && isCheck) {
                const res = await userRegister(registerData)
                navigate(0)
                console.log("res from register", res)
            } else if (e.key === "Enter" && isError) {
                toast.error("Please complete the required fields.");
            } else if (e.key === "Enter" && !isCheck) {
                toast.error("Please agree to the Privacy Policy and Terms and Conditions.");
            }

        } catch (err) {
            console.log(err)
        }
    }



    return (

        <div className="flex flex-col gap-10" >
            {/* CONTENT */}
            <div className='text-center text-6xl font-bold'>REGISTER</div>
            {/* INPUT */}
            <div className='flex flex-col text-2xl'>
                <label className='flex flex-row justify-between font-medium'>USERNAME <span className="text-red-500 text-lg">{error.name}</span></label>
                <input name='name' value={registerData.name} onChange={hdlOnChange} type="text" className="mb-5 p-1" onKeyDown={hdlOnEnter} />
                <label className='flex flex-row justify-between font-medium'>EMAIL <span className="text-red-500 text-lg" >{error.email}</span></label>
                <input name='email' value={registerData.email} onChange={hdlOnChange} type="text" className="mb-5 p-1" onKeyDown={hdlOnEnter} />
                <label className='flex flex-row justify-between font-medium'>PASSWORD <span className="text-red-500 text-lg" >{error.password}</span></label>
                <input name='password' value={registerData.password} onChange={hdlOnChange} type="password" className="mb-5 p-1" onKeyDown={hdlOnEnter} />
                <label className='flex flex-row justify-between font-medium'>CONFIRM PASSWORD <span className="text-red-500 text-lg" >{error.confirmPassword}</span></label>
                <input name='confirmPassword' value={registerData.confirmPassword} onChange={hdlOnChange} type="password" className="mb-5 p-1" onKeyDown={hdlOnEnter} />
            </div>
            {/* PRIVACY AND BUTTON */}
            <div className='flex flex-col gap-10 items-center'>
                <div className='flex flex-row gap-3'>
                    <input type="checkbox" checked={isCheck} onChange={hdlIsCheck} className="scale-150" />
                    <p className="text-lg lg:text-base">I agree to the <button className="underline hover:text-my-prim font-bold" onClick={() => document.getElementById('privacy').showModal()}>Privacy Policy</button> and the <button className="underline hover:text-my-prim font-bold" onClick={() => document.getElementById('terms').showModal()}>Terms and Conditions</button></p>
                    {/* PRIVACY POLICY */}
                    <dialog id="privacy" className="modal">
                        <div className="modal-box bg-blue-100">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <PrivacyPolicy />
                        </div>
                    </dialog>
                    {/* TERMS AND CONDITIONS */}
                    <dialog id="terms" className="modal">
                        <div className="modal-box bg-blue-100">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <TermAndCond />
                        </div>
                    </dialog>
                </div>

                <div className='flex flex-col items-center mb-1'>
                    <button className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-2xl font-semibold' onClick={hdlSubmit}>CREATE ACCOUNT</button>
                </div>
            </div>
        </div>
    )
}

export default Register