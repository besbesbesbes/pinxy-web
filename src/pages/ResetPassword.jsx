import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../api/userProfile'

function ResetPassword() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [password, setPassword] = useState({
        token: token,
        newPassword: "",
        confirmNewPassword: "",
    })

    const hdlOnChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const hdlOnSubmit = async () => {
        try {
            const { newPassword, confirmNewPassword } = password
            if (newPassword !== confirmNewPassword) {
                return alert("Password and confirm password aren't match.")
            }
            if (newPassword.length < 8) {
                return alert("Please fill your password at least eight characters.")
            }
            const resp = await resetPassword(password)
            alert("Already change password.")
            navigate("/")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-10 w-1/4 border p-10'>
            <div className='text-center text-2xl font-bold'>{"RESERT PASSWORD [PINXY]"}</div>
            <div className='flex flex-col'>
                <label>New password</label>
                <input className='border p-1' onChange={hdlOnChange} type="password" name='newPassword' value={password?.newPassword} />
            </div>
            <div className='flex flex-col'>
                <label>Confirm new password</label>
                <input className='border p-1' onChange={hdlOnChange} type="password" name='confirmNewPassword' value={password?.confirmNewPassword} />
            </div>
            <div><button className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-xl font-semibold' onClick={hdlOnSubmit}>Confirm for reset password.</button></div>
        </div>
    )
}

export default ResetPassword