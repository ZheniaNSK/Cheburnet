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
      <div className="chats_container">
        {chats?.length === 0 && <Link to={"/chats/new"} className='btn'>Найти пользователей</Link>}

        {chats?.map((chat) => (
          <Link className="base_div" to={`/chats/${chat.id}`}>
            <h3>Имя: {chat.chat_user.name}</h3>
            <h3>Username: {chat.chat_user.username}</h3>
            <h3>Чат создан: {chat.created_at}</h3>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default ChatsPage