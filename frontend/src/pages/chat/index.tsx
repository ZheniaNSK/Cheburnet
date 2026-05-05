import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./style.css"
import { get_chat, list_chats } from '../../api/chats'
import type { Chat } from '../../types/chats'
import type { Message } from '../../types/message'
import { list_messages } from '../../api/messages'
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
      list_messages(chat_id).then(json => setMessages(json))
    })
  }, [])


  return (
    <main className="container chats-page" ref={ref}>
      {chat?.user1}
      {chat?.user2}
      {messages?.map((message) => (
        <div className="base_div">
          <h3>user: {message.user === user?.id ? "Me" : message.user}</h3>
          <h4>{message.text}</h4>
          <h4>Отправлено: {message.created_at}</h4>
        </div>
      ))}
    </main>
  )
}

export default ChatPage