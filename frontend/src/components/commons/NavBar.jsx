import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from '../auth/Logout'

const NavBar = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setAuth(user ? true : false)
    }, [navigate])

    return (
        <div className='fixed w-full bg-neutral-300 p-2 items-center px-4 shadow-md flex justify-between'>
            <div>logo</div>
            {auth ? (<Logout />) : (<div className='flex gap-5'>
                <button>Signup</button>
                <button>Login</button>
            </div>)}
        </div>
    )
}

export default NavBar
