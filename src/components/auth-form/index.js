import './style.css';
import { useState } from 'react';
import validator from 'validator';
import classNames from 'class-names';

function AuthForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function validate() {
    let isValid = true;
    if (validator.isEmpty(email)) {
      isValid = false;
      setEmailError("Это поле является обязательным!");
    } else if (!validator.isEmail(email)) {
      isValid = false;
      setEmailError("Неверный формат ввода email!");
    } else {
      setEmailError("");
    }
    if (validator.isEmpty(password)) {
      isValid = false;
      setPasswordError("Это поле является обязательным!");
    }
    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      const data = { email, password };
      const res = await fetch("/db-simulator.json", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      });
      if (!res.ok) {
        throw new Error("Auth error");
      }

      // Симуляция работы сервера

      const result = await res.json();
      if (data.email !== result.email) {
        setEmailError("Данный адрес не зарегистрирован");
      } else if (data.password !== result.password) {
        setEmailError("Неправильный пароль");
      } else {
        alert("Аутентификация прошла успешно. В реальном проекте далее будет отображаться главная страница сайта")
      }
    }
  }

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  }

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  }

  return (
    <div className="auth-form-page">
      <form id="auth" className="form" onSubmit={handleSubmit}>
        <h1 className="form__head">Вход</h1>

        <div className={classNames("form__group", emailError ? "form__err" : "")}>
          <label htmlFor="email" className="form__label">Адрес электронной почты</label>
          <input value={email} className="form__input"
            type="text" id="email"
            placeholder="myMail@gmail.com"
            onChange={changeEmailHandler} />
          <span className="form__error-message">{emailError}</span>
        </div>

        <div className={classNames("form__group", passwordError ? "form__err" : "")}>
          <label htmlFor="password" className="form__label">Пароль</label>
          <input value={password} className="form__input"
            type="password" id="password"
            placeholder="password"
            onChange={changePasswordHandler} />
          <span className="form__error-message">{passwordError}</span>
        </div>

        <button type="submit" id="sendForm" className="form__button">Войти</button>
      </form>
    </div>
  );
}

export default AuthForm;
