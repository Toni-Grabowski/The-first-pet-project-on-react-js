import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../component/Header/Header'
import './Register.scss'
const Register = () => {
  const [inputValue, setInputValue] = useState({
    inputName: '',
    inputLastName: '',
    inputEmail: '',
    inputPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация формы
    const newErrors = {};
    if (!inputValue.inputName) newErrors.inputName = 'Name is required';
    if (!inputValue.inputLastName) newErrors.inputLastName = 'Last Name is required';
    if (!inputValue.inputEmail) newErrors.inputEmail = 'Email is required';
    if (!inputValue.inputPassword) newErrors.inputPassword = 'Password is required';

    // Устанавливаем ошибки
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Если ошибок нет, отправляем данные на сервер
    const response = await fetch('', { // отправка данных с инпутов на сервер
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValue)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
      localStorage.setItem('infoUser', data.id);
      localStorage.setItem('flag', true);
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className='form__register' >
        <input
          type="text"
          value={inputValue.inputName}
          onChange={handleChange}
          name='inputName'
          placeholder="Name"
          className='input__register'
        />
        {errors.inputName && <p className="error">{errors.inputName}</p>}
        
        <input
          type="text"
          value={inputValue.inputLastName}
          onChange={handleChange}
          name='inputLastName'
          placeholder="Last Name"
          className='input__register'
        />
        {errors.inputLastName && <p className="error">{errors.inputLastName}</p>}
        
        <input
          type="email"
          value={inputValue.inputEmail}
          onChange={handleChange}
          name='inputEmail'
          placeholder="Email"
          className='input__register'
        />
        {errors.inputEmail && <p className="error">{errors.inputEmail}</p>}
        
        <input
          type="password"
          value={inputValue.inputPassword}
          onChange={handleChange}
          name='inputPassword'
          placeholder="Password"
          className='input__register'
        />
        {errors.inputPassword && <p className="error">{errors.inputPassword}</p>}
        
        <button className='submit__register_form' type="submit">Отправить</button>

        <div className='text_register'>
          Если у вас уже есть аккаунт, то прейдите к <Link to={'/autorization'} className='link'>авторизации</Link>
        </div>

      </form>
      
    </div>
  );
};

export default Register;