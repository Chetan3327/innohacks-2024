import { UserContext } from '@/context/userContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CatalogInfo = () => {
    const navigate = useNavigate()
    const {catalogId} = useParams()
    const {token} = useContext(UserContext)
    const [catalog, setCatalog] = useState(null)
    const deleteCatalog = (id) => {
        axios.delete(`${BACKEND_URL}/api/catalog/${id}/delete`, {headers: {'Authorization' :`Bearer ${token}`}}).then((res) => {
            navigate('/')
        })
    }
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
                <img width={300} src={catalog.coverImgUrl} alt="coverImg" />
                <span>{catalog.name}</span>
            <button onClick={() => deleteCatalog(catalog._id)} className='px-4 p-2 rounded-md shadow-sm bg-red-600 text-white'>delete</button>
            </div>)}

        </div>
    )
}

export default CatalogInfo
