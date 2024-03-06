import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext(null)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo?.user)
        setToken(userInfo?.token)

        if(!userInfo){
            navigate('/')
        }
    }, [navigate])
    const contextValue = {user, token}
    return(
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider