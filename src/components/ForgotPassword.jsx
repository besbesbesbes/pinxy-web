import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { sendResetPassword } from '../api/userProfile'

function ForgotPassword() {
    const [counter, setCounter] = useState(0)
    const [resetPasswordData, setResetPasswordData] = useState({
        realName: "",
        email: "",
    })

    const hdlOnChange = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value,
        })
    }

    const hdlOnReset = async () => {
        const { realName, email } = resetPasswordData

        if (counter === 0) {
            setCounter(30)
        }
        if (realName === "" || email === "") {
            return alert("Please fill all the data.")
        }
        try {
            const resp = await sendResetPassword(resetPasswordData)
            alert("Already send")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let timer;
        if (counter > 0) {
            timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [counter])

    return (
        <div>
            <button className="underline hover:text-my-acct-hover" onClick={() => document.getElementById('forgotPass').showModal()}>Forgot your password?</button>
            <dialog id="forgotPass" className="modal">
                <div className="modal-box max-w-xl h-3/7 p-10">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-16 '>
                        <div className='text-center text-4xl font-bold'>RESET PASSWORD</div>
                        <div className='flex flex-col'>
                            <label className='text-xl'>USERNAME</label>
                            <input name='realName' onChange={hdlOnChange} type="text" className='text-2xl border p-1' value={resetPasswordData?.realName} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xl'>EMAIL</label>
                            <input name='email' onChange={hdlOnChange} type="text" className='text-2xl border p-1' value={resetPasswordData?.email} />
                        </div>
                        <button disabled={counter > 0} onClick={hdlOnReset} className='bg-my-secon text-white hover:bg-my-secon-hover py-3 px-10 text-xl font-semibold'>{counter > 0 ? `waiting ${counter} s` : `Send email for reset password.`}</button>
                    </div>
                    {
                        (counter > 0)

                            ? <div className='mt-2'>Please check your email.</div>
                            : <div className='mt-2'>Note: Please make sure your data is correct</div>
                    }
                </div>
            </dialog>
        </div>
    )
}

export default ForgotPassword