import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import { register } from '../../api/auth'
import { message } from "antd"



function RegisterPage() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const user = await register(payload)

    message.success(`${user.username} успешно зарегистрирован`)
  }


  return (
    <main className="register-page page_center_container">
      <section className="base_div register_div">
        <h2>Регистрация</h2>

        <form onSubmit={handleSubmit} className='form-register'>
          <div>
            <label htmlFor="inp-username" className='h3'>Username</label>
            <input name="username" type="text" className="inp" id="inp-username" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="inp-name" className='h3'>Name</label>
            <input name="name" type="text" className="inp" id="inp-name" required={true} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="inp-password" className='h3'>Password</label>
            <input name="password" type="password" className="inp" id="inp-password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn" type='submit'>Зарегистрироваться</button>

          <Link to={"/auth/login"}>Уже есть аккаунт? Войти.</Link>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage