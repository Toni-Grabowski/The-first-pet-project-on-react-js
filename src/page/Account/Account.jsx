import React, { useEffect, useRef, useState } from 'react'
import './Account.scss'
import { Link } from 'react-router-dom'
import Header from '../../component/Header/Header'
const Account = () => {

  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const inputRef4 = useRef(null)
  const [accountLocalInfo, setAccountLocalInfo] = useState({
    avatar: '',
    inputName: '',
    inputLastName: '',
    inputEmail: '',
    inputPassword: ''
  });

  const [tempAccountInfo, setTempAccountInfo] = useState({
    avatar: '',
    inputName: '',
    inputLastName: '',
    inputEmail: '',
    inputPassword: ''
  });

  const [flagSetings, setFlagSettings] = useState(false);
  let lokal = localStorage.getItem('infoUser');

  useEffect(() => {
    fetch(``, { // изменение данных пользователя по lokal
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountLocalInfo({
          avatar: data.avatar,
          inputName: data.inputName,
          inputLastName: data.inputLastName,
          inputEmail: data.inputEmail,
          inputPassword: data.inputPassword
        });
        setTempAccountInfo({
          avatar: data.avatar,
          inputName: data.inputName,
          inputLastName: data.inputLastName,
          inputEmail: data.inputEmail,
          inputPassword: data.inputPassword
        });
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
      });
  }, [lokal]);

  const exit = () => {
    setAccountLocalInfo(null);
    localStorage.removeItem('infoUser');
    localStorage.removeItem('flag');
  };

  const settingsProfile = () => {
    setFlagSettings(true);
    setTimeout(() => {
      if (inputRef1.current) {
        inputRef1.current.focus();
        inputRef1.current.style.backgroundColor = 'green';
      }
    }, 0);
  };

  const saveSettingsProfile = async () => {
    setFlagSettings(false);

    // Сравниваем оригинальные данные с временными
    if (JSON.stringify(accountLocalInfo) === JSON.stringify(tempAccountInfo)) {
      console.log('No changes detected. No request will be sent.');
      return; // Если данные не изменились, запрос не отправляется
    }

    setAccountLocalInfo(tempAccountInfo);

    await fetch(``, { // обновление данных пользователя по id
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempAccountInfo)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User data updated successfully:', data);
      })
      .catch((error) => console.error('Error updating user data:', error));
  };

  const handleInputSettings = (e) => {
    const { name, value } = e.target;
    setTempAccountInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const deleteProfile =() => {
    fetch(``, { // удаление аккаунта
      method:'DELETE'
    })
    .then((res) =>{
      return res.json()
    })
    .then((data) => {

    })

    localStorage.removeItem('infoUser');
    localStorage.removeItem('flag');


  }

  if (!accountLocalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div key={accountLocalInfo.id} className='profile__border'>
        <div className="content__profile">

        <img className='avatar__user' src={accountLocalInfo.avatar} alt="avatar User" />
        <div className="name__lastName">
          <p className='name'>{accountLocalInfo.inputName}</p>
          <p className='last__name'>{accountLocalInfo.inputLastName}</p>
        </div>
        <p >{accountLocalInfo.inputEmail}</p>

        </div> 
   

        {
          flagSetings ?
            <div>
              <input type="text" className='input' value={tempAccountInfo.inputName} onChange={handleInputSettings} name='inputName' ref={inputRef1}   />
              <input type="text" className='input' value={tempAccountInfo.inputLastName} onChange={handleInputSettings} name='inputLastName' ref={inputRef2}   />
              <input type="text" className='input' value={tempAccountInfo.inputEmail} onChange={handleInputSettings} name='inputEmail' ref={inputRef3}   />
              <input type="text" className='input' value={tempAccountInfo.inputPassword} onChange={handleInputSettings} name='inputPassword' ref={inputRef4}   />
              <button onClick={saveSettingsProfile} className='button__profile' >Сохранить</button>
              <Link to={'/'} >
                <button onClick={deleteProfile} className='button__profile-delete'>Удалить профиль</button>
              </Link>
            </div> : <button onClick={settingsProfile} className='button__profile'>Редактировать профиль</button>

        }

        <Link to={'/'} >
          <button onClick={exit} className='button__profile' >Выйти</button>
        </Link>

      </div>
    </div>
  );
};

export default Account;


