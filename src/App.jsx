import React, { useState } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

import './App.scss';
import AuthRoute from "./pages/AuthRoute";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Profile = React.lazy(() => import("./pages/Profile"));
const LoginForm = React.lazy(() => import("./pages/LoginForm"));
const RegisterForm = React.lazy(() => import("./pages/RegisterForm"));

const sessionUser = sessionStorage.getItem('user');

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(sessionUser ? JSON.parse(sessionUser) : null);
  const [loginError, setLoginError] = useState('');


  const loginUser = async (formData, prevRoute) => {
    try {
      const request = await fetch('http://localhost:4000/users');
      const response = await request.json();

      const existsUser = response.find(el => el.password === formData.password && el.email === formData.email);

      if (existsUser) {
        setUser(existsUser);
        delete existsUser.password;
        sessionStorage.setItem('user', JSON.stringify(existsUser));
        setLoginError('');
        navigate(prevRoute || '/');
      } else {
        setUser(false);
        setLoginError('No existe el usuario o la contraseña no coincide');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <div className="app">
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        {user ?
          <button onClick={logoutUser}>Logout</button> :
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        }
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home user={user} />
              </React.Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About user={user} />
              </React.Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute user={user} component=
                {
                  <React.Suspense fallback={<>...</>}>
                    <Profile user={user} />
                  </React.Suspense>
                }
              />
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <LoginForm loginUser={loginUser} loginError={loginError} />
              </React.Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <React.Suspense fallback={<>...</>}>
                <RegisterForm />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<>...</>}>
                <p>Not Found</p>
              </React.Suspense>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
