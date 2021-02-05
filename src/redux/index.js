import { createStore, applyMiddleware } from "redux";
import voterReducer from "./voterReducer";
import thunk from "redux-thunk";

export default createStore(voterReducer, applyMiddleware(thunk));
