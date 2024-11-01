import React, { useState } from 'react'

function UserProfile() {
    // CHANGE DISPLAYNAME, BIO, PIC PROFILE
    const [editData, setEditData] = useState({
        name: "",
        displayname: "",
        bio: "",
    })

    const hdlOnChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }
    console.log("editData", editData)
    const [isDisabled, setIsDisabled] = useState(true)
    const hdlOnChangePassword = (e) => {
        e.preventDefault()
    }

    const hdlToggleEdit = () => {
        setIsDisabled(!isDisabled)
    }
    const hdlOnConfirm = () => {
        try {
            setIsDisabled(true)
            alert("Update profile done.")
        } catch (err) {
            console.log(err)
        }
    }
    const hdlOnEditPic = () => {

    }

    return (
        <div className='flex flex-col w-full h-full p-2'>
            {/* PIC AND DISPLAYNAME */}
            <div className='flex flex-row h-1/2'>
                {/* PIC */}
                <div className='w-1/3 flex justify-center items-center relative'>
                    <div className=' w-40 h-40 rounded-full overflow-hidden flex items-center'>
                        <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1727088017/samples/upscale-face-1.jpg" alt="picProfile" className='w-full' />
                    </div>
                    <button onClick={hdlOnEditPic} className='z-10 absolute bottom-8 right-8 bg-white shadow-xl w-7 h-7 rounded-full overflow-hidden flex items-center p-1' ><img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1730465009/bp93garcpjms0dzosd1u.png" alt="picEdit" className='w-full' /></button>
                </div>
                {/* DISPLAYNAME */}
                <div className='w-2/3 flex flex-col justify-between p-7'>
                    <div className='flex flex-col gap-2'>
                        <input placeholder='Displayname' disabled={isDisabled} name="displayname" value={editData?.displayname} onChange={hdlOnChange} className={`${isDisabled ? "bg-white border-none" : "border border-gray-400 animate-blink"} text-5xl font-bold' type="text"`} />
                        <div className='text-2xl font-medium'>Username</div>
                    </div>
                    <div className='text-2xl font-medium'>Email@.com</div>
                </div>
            </div>
            <div className=' flex flex-col justify-between  h-1/2 w-full' >
                {/* BIO */}
                <div className='w-full'>
                    <textarea placeholder='Please fill your bio.' disabled={isDisabled} className={`${isDisabled ? "bg-white border-none" : "border border-gray-400 animate-blink"} text-xl w-full p-1 mt-2`} onChange={hdlOnChange} name='bio' value={editData?.bio} id="">Hello everyone, I'm Tony gray. I would like to discover your amazing pins. Can't wait to see it.</textarea>
                </div>
                {/* BUTTON */}
                <div className='flex flex-row justify-between'>
                    <button className='bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md' onClick={hdlOnChangePassword} >Change password</button>
                    <div className='flex flex-row gap-6 text-lg'>
                        <button className='bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md' onClick={hdlToggleEdit} >Edit</button>
                        <button className='bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md' onClick={hdlOnConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile