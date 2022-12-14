import React, { useEffect } from 'react';
import axios from 'axios';
// import { response } from 'express';
// import { withRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LandingPage(props) {
  const navigate = useNavigate();
  // server에 req를 보냄
  useEffect(() => {
    axios.get('/api/hello').then((response) => console.log(response.data));
  }, []);

  const onclickHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/');
      } else {
        alert('로그아웃 하는데 실패 했습니다');
      }
    });
  };

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
      <h2>시작 페이지</h2>

      <button onClick={onclickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
