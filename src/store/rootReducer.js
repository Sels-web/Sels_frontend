import { combineReducers } from 'redux'
import sidebarStore from './sidebarStore'
import membersStore from './memberStore'
import selectedMemberStore from './selectedMemberStore'

const reducers = combineReducers({
  sidebarStore,
  membersStore,
  selectedMemberStore,
})

export default reducers
