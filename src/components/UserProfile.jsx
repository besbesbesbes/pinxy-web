import React, { useEffect, useState } from 'react'
import { updateProfile } from '../api/userProfile'
import ChangePass from './ChangePass'
import ChangePicture from './ChangePicture'
import { useNavigate } from 'react-router-dom'

function UserProfile(props) {
    // CHANGE DISPLAYNAME, BIO, PIC PROFILE

    const navigate = useNavigate()
    const { profileData } = props

    console.log("profileData.displayName", profileData)

    const [editData, setEditData] = useState({
        id: '',
        displayName: '',
        bio: ''
    })

    console.log("editData", editData.displayName)

    const hdlOnChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }
    console.log("editData", editData)
    const [isDisabled, setIsDisabled] = useState(true)


    const hdlToggleEdit = () => {
        setIsDisabled(!isDisabled)
    }

    const hdlOnConfirm = async () => {
        try {
            setIsDisabled(true)
            const resp = await updateProfile(editData)
            alert("Update profile done.")
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (profileData !== null)
            setEditData({
                id: profileData.id,
                displayName: profileData.displayName,
                bio: profileData?.bio
            })

    }, [profileData?.id])

    return (
        <div className='flex flex-col w-full h-full p-2'>
            {/* PIC AND DISPLAYNAME */}
            <div className='flex flex-row h-1/2'>
                {/* PIC */}
                <div className='w-1/3 flex justify-center items-center relative'>
                    <div className=' w-40 h-40 rounded-full overflow-hidden flex items-center'>
                        <img src={profileData?.imageUrl} alt="picProfile" className=' object-cover w-40 h-40' />
                    </div>
                    <ChangePicture imageUrl={profileData?.imageUrl} />
                </div>
                {/* DISPLAYNAME */}
                <div className='w-2/3 flex flex-col justify-evenly p-7'>
                    <div className='flex flex-col gap-2'>
                        <input placeholder='Displayname' disabled={isDisabled} name="displayName" value={editData?.displayName} onChange={hdlOnChange} className={`${isDisabled ? "bg-white border-none" : "border border-gray-400 animate-blink"} text-5xl font-bold' type="text"`} />
                        <div className='text-2xl font-medium'>{profileData?.name}</div>
                    </div>
                    <div className='text-2xl font-medium'>{profileData?.email}</div>
                </div>
            </div>
            <div className=' flex flex-col justify-between  h-1/2 w-full' >
                {/* BIO */}
                <div className='w-full'>
                    <textarea placeholder='Please fill your bio.' disabled={isDisabled} className={`${isDisabled ? "bg-white border-none" : "border border-gray-400 animate-blink"} text-xl w-full p-1 mt-2`} onChange={hdlOnChange} name='bio' value={editData?.bio} id=""></textarea>
                </div>
                {/* BUTTON */}
                <div className='flex flex-row justify-between'>
                    <ChangePass id={profileData?.id} />
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