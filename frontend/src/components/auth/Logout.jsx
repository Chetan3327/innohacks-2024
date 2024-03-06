import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div className={`px-5 py-3 flex gap-2 items-center justify-center`}>
            <span className='flex items-center gap-2 cursor-pointer' onClick={() => handleLogout()}>
                <IoLogOutOutline size={20} />Logout
            </span>
        </div>
    )
}

export default Logout