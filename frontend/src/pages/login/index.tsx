import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import { login } from '../../api/auth'
import { setAccessTokenInStorage, setUserInStorage } from '../../api/baseApi'
import { message } from "antd"



function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const auth_data = await login(payload)

    setAccessTokenInStorage(auth_data.accessToken)
    setUserInStorage({ id: auth_data.id, user: auth_data.user })
    message.success(`${auth_data.user} успешно залогинен`)
  }


  return (
    <main className="login-page page_center_container">
      <section className="base_div login_div">
        <h2>Логин</h2>

        <form onSubmit={handleSubmit} className='form-login'>
          <div>
            <label htmlFor="inp-username" className='h3'>Username</label>
            <input name="username" type="text" className="inp" id="inp-username" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="inp-password" className='h3'>Password</label>
            <input name="password" type="password" className="inp" id="inp-password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn" type='submit'>Войти</button>

          <Link to={"/auth/register"}>Ещё нет аккаунта? Зарегистрироваться.</Link>
        </form>
      </section>
    </main>
  )
}

export default LoginPage