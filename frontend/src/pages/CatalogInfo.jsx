import { UserContext } from '@/context/userContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CatalogInfo = () => {
    const {catalogId} = useParams()
    const {token} = useContext(UserContext)
    const [catalog, setCatalog] = useState(null)
    useEffect(() => {
        if(!token) return 

        axios.get(`${BACKEND_URL}/api/catalog/${catalogId}`, {headers: {'Authorization' :`Bearer ${token}`}}).then((res) => {
            console.log(res.data)
            setCatalog(res.data)
        })
    }, [token])
    return (
        <div className='bg-neutral-600 min-h-screen text-white flex justify-center items-center'>
            {catalog && (<div>
                <img src={catalog.coverImgUrl} alt="coverImg" />
                <span>{catalog.name}</span>
            </div>)}
        </div>
    )
}

export default CatalogInfo
