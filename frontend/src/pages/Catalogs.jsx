import ChatWindow from '@/components/ChatWindow'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRobot } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Catalog = ({_id, name, pdflink, coverImgUrl}) => {
  const navigate = useNavigate()
  return (
  <div onClick={() => navigate(`/catalogs/${_id}`)} className='relative flex hover:cursor-pointer rounded-lg'>
    <img width={300} className='hover:scale-105 hover:transition hover:duration-150 rounded-lg' src={coverImgUrl} alt="" />
    <span className='absolute bottom-2 left-2 font-bold text-black'>{name}</span>
  </div>)
}

const Catalogs = () => {
  const [catalogs, setCatalogs] = useState(null)
  const [showChatBot, setShowChatBot] = useState(true)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/catalog/all`).then((res) => {
      setCatalogs(res.data)
    })
  }, [])
  return (
    <div className='p-20'>
      {catalogs && (<div className='flex gap-5 flex-wrap'>
        {catalogs.map((catalog, idx) => {
          return(<Catalog key={idx} {...catalog} />)
        })}
      </div>)}
      {showChatBot && (<ChatWindow setShowChatWindow={setShowChatBot} />)}
      {!showChatBot && (<div onClick={() => setShowChatBot(true)} className='z-50 absolute right-5 bottom-5 p-3 rounded-full bg-black text-white shadow-lg cursor-pointer'><FaRobot size={20} /></div>)}
    </div>
  )
}

export default Catalogs
