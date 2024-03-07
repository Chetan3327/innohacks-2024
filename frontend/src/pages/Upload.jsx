import { UserContext } from '@/context/userContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import upload from '../assets/upload.png'
import SellerForm from './form'

const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const PYTHON_URL = import.meta.env.VITE_PYTHON_URL

const Upload = () => {
  const [name, setName] = useState("")
  const [pdf, setPdf] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const [pdflink, setPdflink] = useState("")
  const [coverImgUrl, setCoverImgUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { token } = useContext(UserContext)

  const handleInputPdf = (e) => {
    e.preventDefault()
    if (!pdf) {
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
    if (!coverImg) {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(pdf)
    const res = await axios.post(`${PYTHON_URL}/extract-text`, {upload_file: pdf}, { headers: { "Content-Type": "multipart/form-data" } })
    const has_foul_language = res.data.has_foul_language
    const has_images = res.data.has_images
    const has_price = res.data.has_price

    console.log({ name, pdflink, coverImgUrl, has_foul_language, has_images, has_price })
    axios.post(`${BACKEND_URL}/api/catalog/create`, { name, pdflink, coverImgUrl, has_foul_language, has_images, has_price }, { headers: { 'Authorization': `Bearer ${ token }`}
    }).then((response) => {
      navigate('/')
    })
      }
return (<div >
  <div className='relative'>
    <h1 className='text-white relative z-10'>
      lorem ipsum iugfwiesfsbsuadsn
    </h1>
    <img className="w-full absolute" style={{ height: '600px' }} src={upload} alt="Background Image" />
  </div>
  <div className='absolute min-h-screen text-black flex justify-center items-center gap-10 '>
    <div className='flex flex-col gap-4 bg-opacity-50 bg-blur-md backdrop-blur-md bg-white bg-clip-padding border border-opacity-20 border-gray-300 rounded-md p-10 shadow-md'>
      <input type="text" className='p-1.5' placeholder='Name..' onChange={(e) => setName(e.target.value)} />

      <span className="text-white">Upload Catalog</span>
      <input type="file" accept='pdf/*' onChange={(e) => setPdf(e.target.files[0])} />
      {pdf && (<button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleInputPdf(e)}>Upload PDF</button>)}
      {coverImgUrl && (<span className='text-green-400 text-sm'>PDF uploaded</span>)}

      <span className="text-white">Upload Cover Image</span>
      <input type="file" accept='image/*'  onChange={(e) => setCoverImg(e.target.files[0])} />
      {coverImg && (<button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleInputImage(e)}>Upload Cover Image</button>)}
      <button className='px-4 p-2 rounded-md bg-blue-600 text-white' onClick={(e) => handleSubmit(e)}>Submit</button>
      {errorMessage && (<div className="text-[#e74c3c] text-xs">{errorMessage}</div>)}
    </div>

    {coverImgUrl && (
      <div className='bg-white p-10 rounded-md shadow-md'>
        Uploaded Image
        {coverImgUrl && (<img width={400} src={coverImgUrl} alt="Uploaded Cover Image" />)}
      </div>
    )}

  </div>
  <div className='mt-48' style={{ "marginTop": "700px" }}>
    <SellerForm />
  </div>
</div>
);
}

export default Upload