import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { VscLoading, VscClose } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown'

const CHAT_URL = import.meta.env.VITE_CHAT_URL
const ChatWindow = ({setShowChatWindow}) => {
  const [width, setWidth] = useState('25%')
  const [height, setHeight] = useState('70%')
  const [query, setQuery] = useState("")
  const [context, setContext] = useState("")
  const [loading, setLoading] = useState(false)
  const data = [
    {
      message: 'Hi there! How can I help you today?',
      role: 'ai'
    }
  ]
  const [chatData, setChatData] = useState(data)
  const chatContainerRef = useRef(null)
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      conversation()
    }
  }

  const conversation = () => {
    if(!query){
      return
    }
    setQuery("")
    setChatData((chatData) => [...chatData, {message: query, role: 'user'}])
    setLoading(true)
    axios.post(`${CHAT_URL}/conversation_chain.conversation/run`, {
      "history": "string",
      "input": context + query,
      "memory": [
        {}
      ]
    }).then((response) => {
      console.log(response.data)
      setLoading(false)
      setChatData((chatData) => [...chatData, {message: response.data.output, role: 'ai'}])
    })
  }
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [chatData])
  return (
    <div className='absolute bottom-3 right-3 bg-[#0e0e16] z-40 shadow-[#1c1b2d] shadow-2xl text-white' style={{width, height}}>
      <div className='flex flex-col justify-between h-full'>
        <div className='bg-[#1c1b2d] w-full flex items-center justify-between gap-1 px-4 drag-handle py-1.5'>
          <span className='text-gray-500'>AI</span>
          <button onClick={() => setShowChatWindow(false)} className='rounded-full'><VscClose /></button>
        </div>
        <div className='h-full flex flex-col my-4 overflow-y-auto no-scrollbar' ref={chatContainerRef}>
          {chatData.map((chat, idx) => {
            return (<MessageCard key={idx} message={chat.message} role={chat.role} />)
          })}
          {loading && (<span className='px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#1c1b2d] text-left'><VscLoading className='animate-spin' /></span>)}
        </div>
        <div className='w-full flex p-1'>
          <input autoFocus type="text" onKeyDown={(e) => handleKeyDown(e)} value={query} onChange={(e) => setQuery(e.target.value)} className='w-full p-2 outline-none bg-[#1c1b2d] rounded-md' placeholder='Message Luna...' />
          <button onClick={() => conversation()} className='px-4 p-2 bg-[#6a4afe] rounded-lg ml-1'>send</button>
        </div>
      </div>
    </div>
);
}

const MessageCard = ({message, role}) => {
  return (<span className={`px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#${role === 'user' ? '112130' : '1c1b2d'}] text-${role === 'user' ? 'right' : 'left'}`}><ReactMarkdown>{message}</ReactMarkdown></span>)
}

export default ChatWindow