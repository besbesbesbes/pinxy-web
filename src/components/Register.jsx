import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '../api/auth'
import { Link } from 'react-router-dom'



function Register() {

    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        userConfirmPassword: "",
    })
    const [error, setError] = useState({})
    const [isCheck, setIsCheck] = useState(false)

    const hdlOnChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })

    }

    const hdlIsCheck = (e) => {
        setIsCheck(!isCheck)
    }

    const validate = () => {
        const alertError = {}
        // CHECK USERNAME
        if (!registerData.userName.trim()) {
            alertError.userName = "Please fill USERNAME."
        }
        // CHECK EMAIL
        if (!registerData.userEmail.trim()) {
            alertError.userEmail = "Please fill EMAIL."
        } else if (!registerData.userEmail.includes("@") || !registerData.userEmail.includes(".")) {
            alertError.userEmail = "EMAIL must have @ and ."
        }
        // CHECK PASSWORD
        if (!registerData.userPassword.trim()) {
            alertError.userPassword = "Please fill PASSWORD."
        } else if (registerData.userPassword.length <= 8) {
            alertError.userPassword = "PASSWORD must have more than eight characters."
        }
        //CHECK CONFIRM PASSWORD
        if (!registerData.userConfirmPassword.trim()) {
            alertError.userConfirmPassword = "Please fill CONFIRM PASSWORD."
        } else if (registerData.userConfirmPassword !== registerData.userPassword) {
            alertError.userConfirmPassword = "PASSWORD do not match."
        }
        setError(alertError)
        return Object.keys(alertError).length === 0;
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            if (validate() && isCheck) {
                alert("Registration pass")
                userRegister(registerData)
            } else if (!isCheck) {
                alert("Please agree to the Privacy Policy and Terms and Conditions.")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnLink = (e) => {
        e.preventDefault()
        navigate("/")
    }

    console.log("check", isCheck)
    return (
        <div className='flex flex-row h-screen'>
            {/* LEFT */}
            <div className='w-1/2 bg-pink-100'>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h1>Discover What's Happening near You.</h1>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-1/2 bg-blue-100 flex flex-col justify-evenly'>
                {/* CONTENT */}
                <div className='text-center'>REGISTER</div>
                {/* INPUT */}
                <div className='flex flex-col'>
                    <label className='flex flex-row justify-between'>USERNAME <span>{error.userName}</span></label>
                    <input name='userName' value={registerData.userName} onChange={hdlOnChange} type="text" />
                    <label className='flex flex-row justify-between'>EMAIL <span>{error.userEmail}</span></label>
                    <input name='userEmail' value={registerData.userEmail} onChange={hdlOnChange} type="text" />
                    <label className='flex flex-row justify-between'>PASSWORD <span>{error.userPassword}</span></label>
                    <input name='userPassword' value={registerData.userPassword} onChange={hdlOnChange} type="text" />
                    <label className='flex flex-row justify-between'>CONFIRM PASSWORD <span>{error.userConfirmPassword}</span></label>
                    <input name='userConfirmPassword' value={registerData.userConfirmPassword} onChange={hdlOnChange} type="text" />
                </div>
                {/* PRIVACY AND BUTTON */}
                <div className='flex flex-col gap-5 items-center'>
                    <div className='flex flex-row gap-1'>
                        <input type="checkbox" checked={isCheck} onChange={hdlIsCheck} />
                        <p>I agree to the <Link to="/privacy-policy">Privacy Policy</Link> and the <Link to="/terms-and-conditions">Terms and Conditions</Link></p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <button className='bg-slate-100 p-5' onClick={hdlSubmit}>CREATE ACCOUNT</button>
                        <div>Already have an account? <span onClick={hdlOnLink}>Log in</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register