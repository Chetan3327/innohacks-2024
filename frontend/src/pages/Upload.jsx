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
    <div className='bg-neutral-600 min-h-screen text-black flex justify-center items-center gap-10'>
      <div className='flex flex-col gap-4 bg-white p-10 rounded-md shadow-md'>
        <input type="text" className='p-1.5 bg-neutral-100' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <span>upload catalog</span>
        <input type="file" onChange={(e) => setPdf(e.target.files[0])}/>
        {pdf && (<button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleInputPdf(e)}>upload Pdf</button>)}
        {pdflink && (<span className='text-green-400 text-sm'>pdf uploaded</span>)}

        <span>upload cover image</span>
        <input type="file" onChange={(e) => setCoverImg(e.target.files[0])}/>
        {coverImg && (<button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleInputImage(e)}>upload coverimage</button>)}         
        <button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleSubmit(e)}>submit</button>
        {errorMessage && (<div className="text-[#e74c3c] text-xs">{errorMessage}</div>)}
      </div>
      {coverImgUrl && (<div className='bg-white p-10 rounded-md shadow-md'>
        uploaded image
        {coverImgUrl && (<img width={400} src={coverImgUrl} />)}
      </div>)}
    </div>
  )
}

export default Upload
