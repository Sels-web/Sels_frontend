import { combineReducers } from 'redux'
import sidebarStore from './sidebarStore'
import membersStore from './memberStore'
import selectedMemberStore from './selectedMemberStore'
import scheduleStore from './scheduleStore'
import selectedScheduleStore from './selectedScheduleStore'
import attendanceStore from './attendanceStore'
import selectedAttendanceStore from './selectedAttendanceStore'

const reducers = combineReducers({
  sidebarStore,
  membersStore,
  selectedMemberStore,
  scheduleStore,
  selectedScheduleStore,
  attendanceStore,
  selectedAttendanceStore,
})

export default reducers
