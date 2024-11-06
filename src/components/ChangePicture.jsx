import React, { useRef, useState } from 'react'
import { updateProfilePic } from '../api/userProfile'
import useUserStore from '../stores/userStore'
import { useNavigate } from 'react-router-dom'

function ChangePicture(props) {
    const navigate = useNavigate()
    const token = useUserStore((state) => state.token)
    const { imageUrl } = props

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(imageUrl)
    const refImg = useRef(null)

    const hdlDrop = (e) => {
        e.preventDefault()
        const selectedFile = e.dataTransfer.files[0]
        setFile(selectedFile)
        setPreview(URL.createObjectURL(selectedFile))

    }

    const hdlFileChange = (e) => {
        console.log(file)
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setPreview(URL.createObjectURL(selectedFile))
    }

    const hdlDragOver = (e) => {
        e.preventDefault()
    }

    const handleRemove = () => {
        setFile(null)
        setPreview(null)
        if (refImg.current) {
            refImg.current.value = ""
        }
    }

    const hdlSubmit = async () => {
        const formData = new FormData()
        formData.append("image", file)
        try {
            const resp = await updateProfilePic(formData, token)
            alert("Update picture done.")
            navigate(0)

        } catch (err) {
            console.log(err)
        }


    }
    return (
        <div>

            <button onClick={() => document.getElementById('changePicture').showModal()} className=' btn z-10 absolute bottom-8 right-8 bg-white shadow-xl w-7 h-7 rounded-full overflow-hidden flex items-center p-1' >< img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1730465009/bp93garcpjms0dzosd1u.png" alt="picEdit" className='w-full' /></button>
            <dialog id="changePicture" className="modal">
                <div className="modal-box max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-12 p-3'>
                        <div className='text-center text-4xl font-bold'>CHANGE PROFILE PICTURE</div>
                        <div>

                            <div className="flex flex-col items-center gap-5">
                                <div
                                    className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer"
                                    onDrop={hdlDrop}
                                    onDragOver={hdlDragOver}
                                >
                                    {preview ? (
                                        <img src={preview} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
                                    ) : (
                                        <p className="text-gray-500">Drag & Drop your image here</p>
                                    )}
                                </div>
                                <input type="file" onChange={hdlFileChange} className="mt-4" ref={refImg} />
                                <div>
                                    {file && (
                                        <div className='flex flex-row gap-16 mt-5'>
                                            <button
                                                onClick={handleRemove}
                                                className=" bg-my-acct hover:bg-my-acct-hover text-lg text-white py-1 px-3 rounded-md"
                                            >
                                                Remove Image
                                            </button>
                                            <button onClick={hdlSubmit} className=' btn text-lg bg-my-secon hover:bg-my-secon-hover text-white py-1 px-3 rounded-md' >Update picture</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ChangePicture