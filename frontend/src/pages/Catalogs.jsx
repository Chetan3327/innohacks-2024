import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const Catalog = ({_id, name, pdflink, coverImgUrl}) => {
  const navigate = useNavigate()
  return (
  <div onClick={() => navigate(`/catalogs/${_id}`)} className='relative flex hover:cursor-pointer'>
    <img width={400} className='rounded-md' src={coverImgUrl} alt="" />
    <span className='absolute bottom-2 left-2 font-bold text-black'>{name}</span>
  </div>)
}

const Catalogs = () => {
  const [catalogs, setCatalogs] = useState(null)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/catalog/all`).then((res) => {
      setCatalogs(res.data)
    })
  }, [])
  return (
    <div className='p-20 flex gap-5 flex-wrap'>
      {catalogs && (<div>
        {catalogs.map((catalog, idx) => {
          return(<Catalog {...catalog} />)
        })}
      </div>)}
    </div>
  )
}

export default Catalogs
