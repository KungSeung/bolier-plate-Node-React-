import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; // ... : spread Operator => state를 그대로 가져옴
      break;
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    default:
      return state;
  }
}
