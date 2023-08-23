import { combineReducers } from 'redux'
import sidebarStore from './sidebarStore'
import memberStore from './memberStore'

const reducers = combineReducers({
  sidebarStore,
  memberStore,
})

export default reducers
