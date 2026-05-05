import { useEffect, useRef, useState } from 'react'
import "./style.css"
import { list_users } from '../../api/users'
import type { User } from '../../types/auth'
import { create_chat } from '../../api/chats'
import { message } from 'antd'


function UsersPage() {
  const ref = useRef(null)
  const [users, setUsers] = useState<User[] | null>(null)


  useEffect(() => {
    list_users().then(json => setUsers(json))
  }, [])

  return (
    <main className="container users-page" ref={ref}>
      <div className="users_container">
        {users?.map((user) => (
          <div className="base_div">
            <h3>Имя: {user.name}</h3>
            <h3>Username: {user.username}</h3>
            <button className='btn' onClick={() => {
              create_chat({ user2: user.id }).then(() => {
                message.success(`Чат с пользователем ${user.username} создан`)
              })
            }}>Начать чат</button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default UsersPage