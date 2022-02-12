import React, { useState } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

import './App.scss';
import AuthRoute from "./pages/AuthRoute";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Profile = React.lazy(() => import("./pages/Profile"));
const LoginForm = React.lazy(() => import("./pages/LoginForm"));

const userMockArray = [
  {email: 'alumno@upgrade.com', password: '12345', name: 'Alumno'},
  {email: 'mario@upgrade.com', password: '123456', name: 'Mario'},
  {email: 'alberto@upgrade.com', password: '13245', name: 'Alberto'},
]

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');


  const loginUser = (formData, prevRoute) => {
    const existsUser = userMockArray.find(el => el.password === formData.password && el.email === formData.email);

    if (existsUser) {
      setUser(existsUser);
      setLoginError('');
      navigate(prevRoute || '/');
    } else {
      setUser(false);
      setLoginError('No existe el usuario o la contraseña no coincide');
    }
  };

  const logoutUser = () => {
    setUser(null);
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
          <Link to="/login">
            <button>Login</button>
          </Link>
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
