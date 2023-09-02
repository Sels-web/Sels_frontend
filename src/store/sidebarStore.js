import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
}

const changeState = createSlice({
  name: 'sidebarShow',
  initialState: initialState,
  reducers: {
    setSidebarState: (state, action) => {
      switch (action.type) {
        case 'set':
          return { ...state}
        default:
          return state
      }
    },
  },
})

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

export default changeState.reducer