import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import { list_chats } from '../../api/chats'
import type { Chat } from '../../types/chats'


function ChatsPage() {
  const ref = useRef(null)
  const [chats, setChats] = useState<Chat[] | null>(null)


  useEffect(() => {
    list_chats().then(json => setChats(json))
  }, [])


  return (
    <main className="container chats-page" ref={ref}>
      {chats?.map((chat) => (
        <Link className="base_div" to={`/chats/${chat.id}`}>
          <h3>user1: {chat.user1}</h3>
          <h3>user2: {chat.user2}</h3>
          <h3>Чат создан: {chat.created_at}</h3>
        </Link>
      ))}
    </main>
  )
}

export default ChatsPage