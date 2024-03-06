import { UserContext } from '@/context/userContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Upload = () => {
  const [name, setName] = useState("")
  const [pdf, setPdf] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const [pdflink, setPdflink] = useState("")
  const [coverImgUrl, setCoverImgUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const {token} = useContext(UserContext)

  const handleInputPdf = (e) => {
    e.preventDefault()
    if(!pdf){
      setErrorMessage("please upload pdf")
    }
    const data = new FormData()
    data.append("file", pdf)
    data.append("upload_preset", UPLOAD_PRESET)
    data.append("cloud_name", CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
    }).then(resp => resp.json()).then(data => {
        console.log(data.url)
        setPdflink(data.url)
    })
    .catch(err => console.log(err))
  }

  const handleInputImage = (e) => {
    e.preventDefault()
    if(!coverImg){
      setErrorMessage("please upload cover image")
    }
    const data = new FormData()
    data.append("file", coverImg)
    data.append("upload_preset", UPLOAD_PRESET)
    data.append("cloud_name", CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
    }).then(resp => resp.json()).then(data => {
        console.log(data.url)
        setCoverImgUrl(data.url)
    })
    .catch(err => console.log(err))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${BACKEND_URL}/api/catalog/create`, { name, pdflink, coverImgUrl }, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      navigate('/')
    })
  }
  return (
    <div className='bg-neutral-600 min-h-screen text-white flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <input type="text" className='text-black' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <span>upload pdf</span>
        <input type="file" onChange={(e) => setPdf(e.target.files[0])}/>
        {pdf && (<button className='bg-blue-500' onClick={(e) => handleInputPdf(e)}>upload Pdf</button>)}
        <span>upload cover image</span>
        {pdflink && (<span>pdf displayed here{pdflink}</span>)}
        <input type="file" onChange={(e) => setCoverImg(e.target.files[0])}/>
        {coverImg && (<button className='bg-blue-500' onClick={(e) => handleInputImage(e)}>upload coverimage</button>)}
        {coverImgUrl && (<img src={coverImgUrl} />)}
         
        <button onClick={(e) => handleSubmit(e)}>submit</button>
        {errorMessage && (<div className="text-[#e74c3c] text-xs">{errorMessage}</div>)}
      </div>
    </div>
  )
}

export default Upload
