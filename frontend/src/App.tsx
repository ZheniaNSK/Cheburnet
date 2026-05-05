import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/header/index.tsx';
import HomePage from './pages/home/index.tsx';
import RegisterPage from './pages/register/index.tsx';
import LoginPage from './pages/login/index.tsx';
import ChatsPage from './pages/chats/index.tsx';
import UsersPage from './pages/users/index.tsx';
import ChatPage from './pages/chat/index.tsx';






export const router = createBrowserRouter([
  {
    path: "/",
    element:
      (<>
        <Header />
        <HomePage />
      </>)
  },
  {
    path: "/auth/register",
    element:
      (<>
        <Header />
        <RegisterPage />
      </>)
  },
  {
    path: "/auth/login",
    element:
      (<>
        <Header />
        <LoginPage />
      </>)
  },
  {
    path: "/chats",
    element:
      (<>
        <Header />
        <ChatsPage />
      </>)
  },
  {
    path: "/chats/new",
    element:
      (<>
        <Header />
        <UsersPage />
      </>)
  },
  {
    path: "/chats/:chat_id",
    element:
      (<>
        <Header />
        <ChatPage />
      </>)
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;