import reducer from './store/rootReducer'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer,
})

export default store
