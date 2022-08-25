import { Axios } from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // refresh 방지

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/');
      } else {
        alert('Error');
      }
    });
  };
  // Logic : 타이핑을 할때 state을 바꿔주면 value가 바뀜
  // 타이핑 -> onchange -> state : Email, Password -> value

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
