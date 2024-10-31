import React from 'react'
import { userLogin } from '../api/auth'

function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
    })
    const [error, setError] = useState({})

    const hdlOnChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })

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
        setError(alertError)
        return Object.keys(alertError).length === 0;
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            if (validate()) {
                alert("Login pass")
                userLogin(loginData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnLink = (e) => {
        e.preventDefault()
        navigate("/register")
    }


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
                <div className='text-center'>LOG IN</div>
                {/* INPUT */}
                <div className='flex flex-col'>
                    <label className='flex flex-row justify-between'>USERNAME <span>{error.userName}</span></label>
                    <input name='userName' value={registerData.userName} onChange={hdlOnChange} type="text" />
                    <label className='flex flex-row justify-between'>EMAIL <span>{error.userEmail}</span></label>
                    <input name='userEmail' value={registerData.userEmail} onChange={hdlOnChange} type="text" />
                    <label className='flex flex-row justify-between'>PASSWORD <span>{error.userPassword}</span></label>
                    <input name='userPassword' value={registerData.userPassword} onChange={hdlOnChange} type="text" />
                </div>
                {/* BUTTON */}
                <div className='flex flex-col gap-5 items-center'>
                    <div className='flex flex-col items-center'>
                        <button className='bg-slate-100 p-5' onClick={hdlSubmit}>LOG IN</button>
                        <div>Don't have an account? <span onClick={hdlOnLink}>Register</span></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login