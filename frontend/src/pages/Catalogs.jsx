import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Services from './Services'
import { FaRobot } from "react-icons/fa";
import ChatWindow from '@/components/ChatWindow'
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
  const [showChatBot, setShowChatBot] = useState(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/catalog/all`).then((res) => {
      console.log(res.data)
      const catalogs = res.data.sort((a, b) => {
        const sumA = a.has_foul_language + a.has_images + a.has_price;
        const sumB = b.has_foul_language + b.has_images + b.has_price;
  
        return sumB - sumA;
      });
      setCatalogs(catalogs)
    })
  }, [])
  return (
    <div className='transition duration-200'>
    <div className='flex justify-end' style={{background: "#AFAFAF"}}>
    <div className='flex justify-center items-center mt-10 pl-4'>
      <h1 className="text-5xl pt-8 pb-4 pl-10 font-extrabold text-white shadow-lg font-mono hover:scale-105 transition duration-300 ">Unlock the potential of your catalogues with our cutting-edge platform for hassle-free review, scoring, and ranking of retail products.</h1>
    </div>
    <img src=' https://img.freepik.com/free-psd/3d-female-character-holding-tablet-device_23-2148938895.jpg' className='mt-10'/>  
    </div> 
    <div className='mt-40'>
      <h1 className='flex justify-center text-brown-500 font-serif from-neutral-400 text-8xl'>
        Our Services
      </h1>
      <div className='mt-10'>
        <Services/>
      </div>
    </div>
    <div className='text-center mt-36 text-8xl'>
      OUR TOP CATALOGS
    </div>
    <div className='p-20'>
      {catalogs && (<div className='flex gap-5 flex-wrap'>
        {catalogs.map((catalog, idx) => {
          return(<Catalog {...catalog} key={idx} />)
        })}
      </div>)}
      {showChatBot && (<ChatWindow setShowChatWindow={setShowChatBot} />)}
      {!showChatBot && (<div onClick={() => setShowChatBot(true)} className='z-50 fixed right-5 bottom-5 p-3 rounded-full bg-black text-white shadow-lg cursor-pointer'><FaRobot size={20} /></div>)}
      </div>
    </div>
  )
}

export default Catalogs