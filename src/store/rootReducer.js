import { combineReducers } from 'redux'
import sidebarStore from './sidebarStore'
import membersStore from './memberStore'
import selectedMemberStore from './selectedMemberStore'
import scheduleStore from './scheduleStore'
import attendanceStore from './attendanceStore'

const reducers = combineReducers({
  sidebarStore,
  membersStore,
  selectedMemberStore,
  scheduleStore,
  attendanceStore,
})

export default reducers
