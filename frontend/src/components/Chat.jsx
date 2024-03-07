import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { VscLoading, VscClose } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown'

const CHAT_URL = import.meta.env.VITE_CHAT_URL
const Chat = ({setShowChatWindow, name}) => {
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
    // axios.post(`${CHAT_URL}/conversation_chain.conversation/run`, {
    //   "history": "string",
    //   "input": context + query,
    //   "memory": [
    //     {}
    //   ]
    // }).then((response) => {
    //   console.log(response.data)
    //   setChatData((chatData) => [...chatData, {message: response.data.output, role: 'ai'}])
    // })
    setLoading(false)
  }
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [chatData])
  return (
    <div className='fixed bottom-3 right-3 bg-[#ededee] z-40 shadow-[#656569] text-black' style={{width, height}}>
      <div className='flex flex-col justify-between h-full'>
        <div className='bg-[#656569] w-full flex items-center justify-between gap-1 px-4 drag-handle py-1.5'>
          <span className='text-black'>{name}</span>
          <button onClick={() => setShowChatWindow(false)} className='rounded-full'><VscClose /></button>
        </div>
        <div className='h-full flex flex-col my-4 overflow-y-auto no-scrollbar' ref={chatContainerRef}>
          {chatData.map((chat, idx) => {
            return (<MessageCard key={idx} message={chat.message} role={chat.role} />)
          })}
          {loading && (<span className='px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#656569] text-left'><VscLoading className='animate-spin' /></span>)}
        </div>
        <div className='w-full flex p-1'>
          <input autoFocus type="text" onKeyDown={(e) => handleKeyDown(e)} value={query} onChange={(e) => setQuery(e.target.value)} className='w-full p-2 outline-none bg-[#656569] rounded-md' placeholder='Message Seller...' />
          <button onClick={() => conversation()} className='px-4 p-2 bg-[#464547] rounded-lg ml-1'>send</button>
        </div>
      </div>
    </div>
);
}

const MessageCard = ({message, role}) => {
  return (<span className={`px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#${role === 'user' ? '112130' : '656569'}] text-${role === 'user' ? 'right' : 'left'}`}><ReactMarkdown>{message}</ReactMarkdown></span>)
}

export default Chat