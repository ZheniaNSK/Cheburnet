import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./style.css"
import { get_chat, list_chats } from '../../api/chats'
import type { Chat } from '../../types/chats'
import type { Message } from '../../types/message'
import { create_message, list_messages } from '../../api/messages'
import { getUserInStorage } from '../../api/baseApi'


function ChatPage() {
  const ref = useRef(null)
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(null)
  const { chat_id } = useParams();
  const user = getUserInStorage()


  useEffect(() => {
    if (!chat_id) return
    get_chat(chat_id).then((json) => {
      console.log(json);
      setChat(json)

    })
    list_messages(chat_id).then(json => {
      setMessages(json); console.log(json);
    })
  }, [])

  const submitHandler = (e) => {
    if (chat_id === undefined) return
    e.preventDefault()
    const data = new FormData(e.target)
    const payload = Object.fromEntries(data.entries());
    e.target.reset()
    
    create_message(chat_id, payload).then(json => setMessages([...(messages || []), json]))
  }


  return (
    <main className="container chats-page" ref={ref}>
      <div className="chat_names">
        <h2>Чат с {chat?.chat_user.name}</h2>
      </div>

      <div className="messages_container">
        {messages?.map((message) => (
          <div className={`base_div ${message.user === user?.id ? "me" : "opponent"}`} key={`base_div-${message.id}`}>
            <h3 key={`h3-${message.id}`}>user: {message.user === user?.id ? "Me" : message.user}</h3>
            <h4 key={`text-${message.id}`}>{message.text}</h4>
            <h4 key={`created_at-${message.id}`}>Отправлено: {message.created_at}</h4>
          </div>
        ))}
      </div>

      <div className="input_message_container">
        <form onSubmit={submitHandler}>
          <input type="text" name='text' id="message_text" className='inp' />
          <button className='btn' type='submit'>Отправить</button>
        </form>
      </div>
    </main>
  )
}

export default ChatPage