import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const submitForm = (ev) => {
    ev.preventDefault();
    console.log(formData);

    // TODO: Validations

    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }

    const registerUser = async () => {
      try {
        const request = await fetch('http://localhost:4000/users', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const response = await request.json();

        console.log(response);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    };

    registerUser();
  }

  const changeInput = (ev) => {
    const { name, value } = ev.target;

    setFormData({ ...formData, [name]: value });
  };


  return (
    <form onSubmit={submitForm}>
      <label>
        <p>Name</p>
        <input type="text" name="name" onChange={changeInput} value={formData.name} />
      </label>

      <label>
        <p>Email</p>
        <input type="text" name="email" onChange={changeInput} value={formData.email} />
      </label>

      <label>
        <p>Contraseña</p>
        <input type="password" name="password" onChange={changeInput} value={formData.password} />
      </label>

      <label>
        <p>Contraseña</p>
        <input type="password" name="repeatPassword" onChange={changeInput} value={formData.repeatPassword} />
      </label>

      <div className="mt-16">
        <button type='submit'>Register</button>
      </div>

      {/* {props.loginError && <div style={{color: 'red'}}>{props.loginError}</div>} */}
    </form>
  );
}

export default RegisterForm;