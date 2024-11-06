// import React, { useState } from 'react'
// import { userLogin } from '../api/auth'
// import { useNavigate } from 'react-router-dom'

// const INITIAL_ERROR_INPUT = {
//     input: "Please fill USERNAME or Email",
//     password: "Please fill PASSWORD.",
// }

// function Login() {

//     const [isError, setIsError] = useState(null)
//     const [isEmail, setIsEmail] = useState(null)
//     const navigate = useNavigate()
//     const [loginData, setLoginData] = useState({
//         input: "",
//         password: "",
//         roleInput: isEmail,
//     })
//     const [error, setError] = useState({})


//     const hdlOnChange = (e) => {
//         setLoginData({
//             ...loginData,
//             [e.target.name]: e.target.value
//         })
//         validate(e.target.name, e.target.value)
//     }


//     const validate = (name, value) => {
//         let alertError = {};

//         if (Object.keys(error).length === 0) {
//             alertError = { ...INITIAL_ERROR_INPUT }
//         } else {
//             alertError = { ...error }
//         }
//         if (loginData.input.includes("@")) {
//             setIsEmail(true)
//         } else {
//             setIsEmail(false)
//         }
//         // CHECK USERNAME
//         if (name === 'input') {
//             if (!value.trim()) {
//                 alertError.input = "Please fill USERNAME or Email"
//             } else {
//                 alertError.input = ""
//             }
//         }
//         // CHECK PASSWORD AND CONFIRM PASSWORD
//         if (name === "password") {
//             if (!value.trim()) {
//                 alertError.password = "Please fill PASSWORD."
//             } else if (value.length <= 8) {
//                 alertError.password = "PASSWORD must have more than eight characters."
//             } else {
//                 alertError.password = ""
//             }
//         }
//         setError(alertError)
//         return setIsError(!!(alertError.password || alertError.email || alertError.name))
//     }

//     console.log("isEmail", isEmail)
//     console.log("loginData", loginData)

//     const hdlSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             if (loginData.input === "" && loginData.password === "") {
//                 alert("please fill al the data.")
//             } else if (!isError) {
//                 alert("log in pass");
//                 // userLogin(loginData)
//             } else if (isError) {
//                 alert("please fill all the data.");
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const hdlOnLink = (e) => {
//         e.preventDefault()
//         navigate("/register")
//     }


//     return (
//         <div className='flex flex-row h-screen'>
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
//                 <div className="flex flex-col w-2/3 h-4/5 bg-my-bg-main bg-opacity-60 shadow-lg p-10 justify-evenly rounded-3xl">
//                     {/* CONTENT */}
//                     <div className='text-center text-4xl font-bold'>LOG IN</div>
//                     {/* INPUT */}
//                     <div className='flex flex-col text-lg'>
//                         <label className='flex flex-row justify-between font-medium'>USERNAME / EMAIL <span className="text-red-500 text-sm">{error.input}</span></label>
//                         <input name='input' value={loginData.input} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                         <label className='flex flex-row justify-between font-medium'>PASSWORD <span className="text-red-500 text-sm">{error.password}</span></label>
//                         <input name='password' value={loginData.password} onChange={hdlOnChange} type="text" className="mb-5 p-1" />
//                     </div>
//                     {/* BUTTON */}
//                     <div className='flex flex-col gap-5 items-center'>
//                         <div className='flex flex-col items-center gap-1'>
//                             <button className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-xl font-semibold' onClick={hdlSubmit}>LOG IN</button>
//                             <div className="text-base">Don't have an account? <button onClick={hdlOnLink} className="underline hover:text-my-prim font-bold">Register</button></div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login


import React, { useState } from 'react'
import { userLogin } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'
import LoginGoogle from './LoginGoogle'

const INITIAL_ERROR_INPUT = {
    input: "Please fill USERNAME or Email",
    password: "Please fill PASSWORD.",
}

function Login() {
    const login = useUserStore((state) => state.login)
    const [isError, setIsError] = useState(null)
    const [isEmail, setIsEmail] = useState(null)
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        input: "",
        password: "",
        roleInput: isEmail,
    })
    const [error, setError] = useState({})


    const hdlOnChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
            roleInput: isEmail
        })
        validate(e.target.name, e.target.value)
    }

    const validate = (name, value) => {
        let alertError = {};

        if (Object.keys(error).length === 0) {
            alertError = { ...INITIAL_ERROR_INPUT }
        } else {
            alertError = { ...error }
        }
        if (loginData.input.includes("@")) {
            setIsEmail(true)
        } else {
            setIsEmail(false)
        }
        // CHECK USERNAME
        if (name === 'input') {
            if (!value.trim()) {
                alertError.input = "Please fill USERNAME or Email"
            } else {
                alertError.input = ""
            }
        }
        // CHECK PASSWORD AND CONFIRM PASSWORD
        if (name === "password") {
            if (!value.trim()) {
                alertError.password = "Please fill PASSWORD."
            } else if (value.length <= 8) {
                alertError.password = "PASSWORD must have more than eight characters."
            } else {
                alertError.password = ""
            }
        }
        setError(alertError)
        return setIsError(!!(alertError.password || alertError.email || alertError.name))
    }

    console.log("isEmail", isEmail)
    console.log("loginData", loginData)

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            if (loginData.input === "" && loginData.password === "") {
                alert("please fill al the data.")
            } else if (!isError) {
                alert("log in pass");
                const res = await userLogin(loginData)
                console.log("res from log in", res)
                login(res)
                console.log("res", res)
                if (res.data.payload.role === "USER") {
                    navigate("/")
                } else {
                    navigate("/admin")
                }

            } else if (isError) {
                alert("please fill all the data.");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnEnter = async (e) => {
        try {
            const { input, password } = loginData
            if (e.key === "Enter" && input !== "" && password !== "") {
                alert("log in pass");
                const res = await userLogin(loginData)
                console.log("res from log in", res)
                login(res)
                console.log("res", res)
                if (res.data.payload.role === "USER") {
                    navigate("/")
                } else {
                    navigate("/admin")
                }
            } else if (e.key === "Enter") {
                alert("Please fill all the data.")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='flex flex-col gap-16'>
            {/* CONTENT */}
            <div className='text-center text-4xl font-bold'>LOG IN</div>
            {/* INPUT */}
            <div className='flex flex-col text-lg gap-3'>
                <label className='flex flex-row justify-between font-medium'>USERNAME / EMAIL <span className="text-red-500 text-sm">{error.input}</span></label>
                <input name='input' value={loginData.input} onChange={hdlOnChange} type="text" className="mb-5 p-1" onKeyDown={hdlOnEnter} />
                <label className='flex flex-row justify-between font-medium'>PASSWORD <span className="text-red-500 text-sm">{error.password}</span></label>
                <input name='password' value={loginData.password} onChange={hdlOnChange} type="password" className=" p-1" onKeyDown={hdlOnEnter} />
            </div>
            {/* BUTTON */}
            <div className='flex flex-col items-center'>
                <div className='flex flex-col mb-1'>

                    <button className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-xl font-semibold' onClick={hdlSubmit}>LOG IN</button>
                    <LoginGoogle />
                </div>
            </div>
        </div>

    )
}

export default Login

