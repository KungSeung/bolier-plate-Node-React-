import { combineReducers } from 'redux';
import user from './user_reducer';
// import comment from './comment_reducer';

// combineReducers - 여러가지 reducer들을 합쳐놓음
// user, comment, subscribe 등등
// 그만큼 상태가 변하는 container들이 상당히 많다
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
