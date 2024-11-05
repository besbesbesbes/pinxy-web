import React, { useState } from 'react'
import { changePassword } from '../api/userProfile'
import { identity } from 'lodash'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'

function ChangePass(props) {
    const logout = useUserStore((state) => state.logout)
    const navigate = useNavigate()
    const { id } = props

    const [passwordData, setPasswordData] = useState({
        id: id,
        oldPassword: "",
        newPassword: "",
    })

    console.log("passwordData", passwordData)

    const hdlOnChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        })
    }
    console.log("2", passwordData)

    const hdlOnChangePassword = async () => {
        try {
            // if (passwordData.newPassword < 8) {
            //     return alert("Please fill password at least eight characters.")
            // }

            // const resp = await changePassword(passwordData)
            alert("Change password done.")
            logout()
        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnClose = () => {
        setPasswordData({
            id: id,
            oldPassword: "",
            newPassword: "",
        })
    }

    return (
        <div>
            <button className=' btn text-lg bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md' onClick={() => document.getElementById('boxPass').showModal()}>Change password</button>
            <dialog id="boxPass" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={hdlOnClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className='flex flex-col gap-12'>
                        <div className='text-center text-4xl font-bold'>CHANGE PASSWORD</div>
                        <div className='flex flex-col'>
                            <label className='text-xl'>Old Password</label>
                            <input name='oldPassword' onChange={hdlOnChange} type="password" className='text-2xl border p-1' value={passwordData?.oldPassword} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xl'>New Password</label>
                            <input name='newPassword' onChange={hdlOnChange} type="password" className='text-2xl border p-1' value={passwordData?.newPassword} />
                        </div>
                        <button onClick={hdlOnChangePassword} className=' btn text-lg bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md'>Confirm change password</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ChangePass