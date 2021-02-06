import { LOGIN_USER, LOADING } from "./actions";
const initialState = {
  userName: "",
  ward: "",
  village: "",
  loading: false,
};

export default function voterReducer(state = initialState, action) {
  const payload = { ...action.payload };
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...payload, loading: false };
    case LOADING:
      return { ...state, loading: payload };
    default:
      return { ...state };
  }
}
