import React, { useState } from 'react'
import Header from '../../component/Header/Header'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Autorization.scss'

const Autorization = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email:'',
    password:''
  })
  const[flagAuth, setFlagAuth] = useState(false)

  const handleInputClick  = (e) => {
    const {name, value} = e.target;
    setInputValue({...inputValue, [name]: value});
  }

  const submitFormAuth = async () => {
    await fetch(``, { // нахождение пользователя по зарегестрированным данным
      method:'GET',
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const user = data.find((user) => user.inputEmail === inputValue.email && user.inputPassword === inputValue.password)
      if(user) {
        setFlagAuth(true);
        localStorage.setItem('infoUser', user.id);
        localStorage.setItem('flag', true);
        navigate('/account');
      }else {
        alert('Такой пользователь не найден');
      }
    })
  }


 
  return (
    <>
      <Header/>

    <div className='form__autorization'>
        <input className='email' type="email" placeholder="Email" name='email' onChange={ handleInputClick}  value={inputValue.email} />
        <input className='password' type="password" placeholder="Password" name='password' onChange={ handleInputClick} value={inputValue.password} />
        <button className='submit' onClick={submitFormAuth}>Войти</button>
        

    </div>
 </>

  )
}

export default Autorization