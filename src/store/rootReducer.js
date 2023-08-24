import { combineReducers } from 'redux'
import sidebarStore from './sidebarStore'
import membersStore from './memberStore'
import selectedMemberStore from './selectedMemberStore'
import scheduleStore from './scheduleStore'

const reducers = combineReducers({
  sidebarStore,
  membersStore,
  selectedMemberStore,
  scheduleStore,
})

export default reducers
