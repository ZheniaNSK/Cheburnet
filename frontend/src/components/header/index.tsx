import { Link, useLocation, useNavigate } from "react-router";
import "./style.css";
import { clearAccessTokenInStorage, clearUserInStorage, getUserInStorage } from "../../api/baseApi";

const navLinks = [
  { to: "/chats", label: "Мои чаты" },
  { to: "/chats/new", label: "Найти пользователей" },
];

function Header() {
  const location = useLocation();
  const user = getUserInStorage()
  const navigate = useNavigate()

  return (
    <>
      <nav className="main_nav">
        <Link to="/" className="logo">
          <div className="logo">
            Чебурнет
          </div>
        </Link>

        <div
          className="nav_links"
        >
          {navLinks.map(
            (link) =>
              <Link
                key={link.to}
                to={link.to}
                className={
                  location.pathname === link.to
                    ? "btn active"
                    : "btn"
                }
              >
                {link.label}
              </Link>
          )}
        </div>

        <div className="nav_right">
          {user ? (
            <button className="btn" onClick={() => {
              clearAccessTokenInStorage()
              clearUserInStorage()
              navigate("/")
            }}>Выйти из аккаунта {user.user}</button>
          ) : (
            <Link to="/auth/login" className={
              location.pathname === "/auth/login"
                ? "btn active"
                : "btn"
            }>Войти</Link>
          )}
        </div>
      </nav>
    </>
  );
}



export default Header